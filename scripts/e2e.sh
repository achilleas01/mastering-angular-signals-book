#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "🔍 Discovering E2E projects..."

E2E_PROJECTS=() # Initialize an empty array

# Read each line of output from 'npx nx show projects' into the E2E_PROJECTS array
# This method is compatible with older bash versions (e.g., Bash 3.x on macOS)
while IFS= read -r line; do
  if [[ -n "$line" ]]; then # Ensure line is not empty and not just whitespace
    E2E_PROJECTS+=("$line")
  fi
done < <(npx nx show projects --with-target e2e)


if [ ${#E2E_PROJECTS[@]} -eq 0 ]; then
  echo "⚠️ No E2E projects found with an 'e2e' target."
  # Add a check to see if the command actually failed or returned nothing
  if ! npx nx show projects --with-target e2e > /dev/null 2>&1; then
    echo "🚨 Error: 'npx nx show projects --with-target e2e' command failed."
  fi
  exit 0
fi

echo "✅ Found E2E projects: (${#E2E_PROJECTS[@]} projects)"
# For better visibility if there are many:
printf "   %s\n" "${E2E_PROJECTS[@]}"
echo ""

SUCCESS_COUNT=0
FAIL_COUNT=0
FAILED_PROJECTS=()

# --- Main Loop ---
for project in "${E2E_PROJECTS[@]}"; do
  echo "----------------------------------------------------"
  echo "🚀 Starting E2E tests for: $project"
  echo "----------------------------------------------------"

  if npx nx e2e "$project"; then
    echo "✅ E2E tests PASSED for: $project"
    ((SUCCESS_COUNT++))
  else
    echo "❌ E2E tests FAILED for: $project"
    ((FAIL_COUNT++))
    FAILED_PROJECTS+=("$project")
    # To stop on first failure, uncomment the next line:
    # echo "Aborting remaining tests due to failure."
    # exit 1
  fi
  echo "----------------------------------------------------"
  echo ""
done

echo "========= E2E Test Summary ========="
echo "PASSED: $SUCCESS_COUNT"
echo "FAILED: $FAIL_COUNT"

if [ $FAIL_COUNT -gt 0 ]; then
  echo "------------------------------------"
  echo "Failed projects:"
  printf "  - %s\n" "${FAILED_PROJECTS[@]}"
  echo "------------------------------------"
  exit 1
else
  echo "🎉 All identified E2E tests completed successfully."
  exit 0
fi