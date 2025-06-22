#!/bin/bash
echo "CI SCRIPT: Script starting. Strict mode (set -e) is ON."
set -e

echo "CI SCRIPT: 🔍 Discovering E2E projects..."
E2E_PROJECTS=()
RAW_PROJECT_LIST_FILE=$(mktemp) # Using a temp file for full output capture

# Capture all output (stdout & stderr) from nx show projects and its exit code
echo "CI SCRIPT: Running 'npx nx show projects --with-target e2e'..."
if npx nx show projects --with-target e2e > "$RAW_PROJECT_LIST_FILE" 2>"${RAW_PROJECT_LIST_FILE}.err"; then
  echo "CI SCRIPT: 'nx show projects' command succeeded."
else
  NX_SHOW_EXIT_CODE=$?
  echo "CI SCRIPT: 🚨 WARNING: 'npx nx show projects --with-target e2e' command failed with exit code $NX_SHOW_EXIT_CODE."
  echo "CI SCRIPT: --- STDOUT from 'nx show projects' (if any) ---"
  cat "$RAW_PROJECT_LIST_FILE"
  echo "CI SCRIPT: --- STDERR from 'nx show projects' (if any) ---"
  cat "${RAW_PROJECT_LIST_FILE}.err"
  echo "CI SCRIPT: ---------------------------------------------"
  # Decide if this is a fatal error. If no projects can be listed, maybe it is.
  # For now, let's allow it to continue to see if any projects were listed before error.
fi

echo "CI SCRIPT: --- Raw output from 'nx show projects' (from $RAW_PROJECT_LIST_FILE): ---"
cat "$RAW_PROJECT_LIST_FILE" || echo "CI SCRIPT: (Raw project list file was empty or unreadable)"
echo "CI SCRIPT: -----------------------------------------------------------------------"
echo "CI SCRIPT: --- Errors from 'nx show projects' (from ${RAW_PROJECT_LIST_FILE}.err): ---"
cat "${RAW_PROJECT_LIST_FILE}.err" || echo "CI SCRIPT: (Raw project list error file was empty or unreadable)"
echo "CI SCRIPT: -------------------------------------------------------------------------"


while IFS= read -r line; do
  # Trim whitespace (bash 4+ specific, but often available on GA runners. If not, simple [[ -n "$line" ]] is fine)
  # line=$(echo "$line" | xargs)
  if [[ -n "$line" ]]; then # Check if the line is not empty after potential trimming
    echo "CI SCRIPT: Read line from project list: [$line]"
    E2E_PROJECTS+=("$line")
  else
    echo "CI SCRIPT: Read empty or whitespace-only line from project list. Skipping."
  fi
done < "$RAW_PROJECT_LIST_FILE"

rm -f "$RAW_PROJECT_LIST_FILE" "${RAW_PROJECT_LIST_FILE}.err" # Clean up temp files

echo "CI SCRIPT: Parsed E2E_PROJECTS array: (${E2E_PROJECTS[*]})" # Using [*] for space-separated view for logs
echo "CI SCRIPT: Number of projects parsed: ${#E2E_PROJECTS[@]}"

if [ ${#E2E_PROJECTS[@]} -eq 0 ]; then
  echo "CI SCRIPT: ⚠️ No E2E projects were parsed. Exiting successfully as there's nothing to test."
  exit 0
fi

SUCCESS_COUNT=0
FAIL_COUNT=0
FAILED_PROJECTS=()

echo "CI SCRIPT: Initial SUCCESS_COUNT=$SUCCESS_COUNT, FAIL_COUNT=$FAIL_COUNT"

PROJECT_INDEX=0
for project in "${E2E_PROJECTS[@]}"; do
  echo "CI SCRIPT: ----------------------------------------------------"
  echo "CI SCRIPT: LOOP ITERATION: $((PROJECT_INDEX + 1)) / ${#E2E_PROJECTS[@]}"
  echo "CI SCRIPT: Current project from array: [$project]" # Brackets to see if it's empty or has whitespace

  if [[ -z "$project" ]]; then
    echo "CI SCRIPT: ⚠️ WARNING: Project name is empty in loop. Skipping this iteration."
    PROJECT_INDEX=$((PROJECT_INDEX + 1))
    continue
  fi

  echo "CI SCRIPT: 🚀 Starting E2E tests for project: [$project]"

  # Run the e2e command and capture its exit code explicitly
  # Adding a || true temporarily if we suspect set -e is too aggressive with nx e2e warnings
  # npx nx e2e "$project" || true
  npx nx e2e "$project"
  NX_E2E_EXIT_CODE=$?
  echo "CI SCRIPT: 'npx nx e2e $project' finished with exit code: $NX_E2E_EXIT_CODE"

  if [ "$NX_E2E_EXIT_CODE" -eq 0 ]; then
    echo "CI SCRIPT: ✅ E2E command for [$project] exited with 0. Marking as PASSED."
    echo "CI SCRIPT: Attempting to increment SUCCESS_COUNT (current value: $SUCCESS_COUNT)."
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1)) # Using a more standard POSIX way, though ((...)) should be fine
    INCREMENT_EXIT_CODE=$?
    echo "CI SCRIPT: SUCCESS_COUNT increment command exited with $INCREMENT_EXIT_CODE."
    echo "CI SCRIPT: SUCCESS_COUNT is now: $SUCCESS_COUNT."
  else
    echo "CI SCRIPT: ❌ E2E command for [$project] exited with $NX_E2E_EXIT_CODE. Marking as FAILED."
    ((FAIL_COUNT++))
    FAILED_PROJECTS+=("$project")
    echo "CI SCRIPT: FAIL_COUNT is now: $FAIL_COUNT"
    # To stop on first failure in CI, you can uncomment the next two lines
    # echo "CI SCRIPT: Aborting script due to failure in project [$project]."
    # exit 1
  fi
  echo "CI SCRIPT: Finished processing project: [$project]. Loop continuing..."
  PROJECT_INDEX=$((PROJECT_INDEX + 1))
done

echo "CI SCRIPT: Loop finished."
echo "CI SCRIPT: ----------------------------------------------------"
echo "CI SCRIPT: ========= E2E Test Summary ========="
echo "CI SCRIPT: Final SUCCESS_COUNT: $SUCCESS_COUNT"
echo "CI SCRIPT: Final FAIL_COUNT: $FAIL_COUNT"
echo "CI SCRIPT: Total projects processed (from loop iterations): $PROJECT_INDEX"
echo "CI SCRIPT: Total projects initially found: ${#E2E_PROJECTS[@]}"


if [ $FAIL_COUNT -gt 0 ]; then
  echo "CI SCRIPT: ------------------------------------"
  echo "CI SCRIPT: Failed projects identified:"
  # Loop to print array elements safely
  for fp in "${FAILED_PROJECTS[@]}"; do
    echo "CI SCRIPT:   - [$fp]"
  done
  echo "CI SCRIPT: ------------------------------------"
  echo "CI SCRIPT: Script exiting with 1 due to test failures."
  exit 1
else
  if [ $PROJECT_INDEX -eq 0 ] && [ ${#E2E_PROJECTS[@]} -gt 0 ]; then
    # This case should ideally not be hit if the first check for #E2E_PROJECTS[@] -eq 0 works
    echo "CI SCRIPT: ⚠️ WARNING: Projects were found but loop did not seem to process any. This is unusual."
    echo "CI SCRIPT: Script exiting with 1 due to processing anomaly."
    exit 1
  elif [ ${#E2E_PROJECTS[@]} -eq 0 ]; then
     # This case is already handled above, but as a safeguard.
     echo "CI SCRIPT: 🎉 No projects were found to test (re-confirming). Script exiting with 0."
     exit 0
  elif [ $SUCCESS_COUNT -lt $PROJECT_INDEX ]; then
    echo "CI SCRIPT: ⚠️ WARNING: Not all processed projects were marked as successful, but no failures were explicitly counted. This indicates an issue."
    echo "CI SCRIPT: Script exiting with 1 due to count mismatch."
    exit 1
  else
    echo "CI SCRIPT: 🎉 All identified and processed E2E tests completed successfully according to their exit codes."
    echo "CI SCRIPT: Script exiting with 0."
    exit 0
  fi
fi