import { checkGitRepoStatus } from "../utils/index.js";
import { NotGitRepoError, GitDirtyError } from "../errors.js";

export async function ensureGitRepo() {
  const { isGitRepo, isClean } = await checkGitRepoStatus();

  if (!isGitRepo) throw new NotGitRepoError();
  if (!isClean) throw new GitDirtyError();
}
