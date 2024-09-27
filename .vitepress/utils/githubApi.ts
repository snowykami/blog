//  https://api.github.com/repos/OWNER/REPO/issues
const API_BASE = "http://127.0.0.1:8888"

export async function getRepoTrendIssues() {
    const url = new URL(`${API_BASE}/trends`);
    url.search = new URLSearchParams({}).toString();
    const response = await fetch(url.toString());
    console.log(url.toString());
    return response.json();
}

export async function getIssueComments(issueUrl: string) {
    const queryParam = {
        url: issueUrl,
    }
    const url = new URL(`${API_BASE}/trends/comments`);
    url.search = new URLSearchParams(queryParam).toString();
    const response = await fetch(url.toString());
    console.log(url.toString());
    return response.json();
}