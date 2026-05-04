files=('repo_map.md' 'reuse_candidate_log.md' 'legacy_risks.md' 'feature_scope.md' 'migration_decision_log.md' 'CONTEXT.md')
mkdir -p 90_legacy_review
for f in "${files[@]}"; do
  touch "90_legacy_review/$f"
done
echo "Legacy review workspace enabled."
