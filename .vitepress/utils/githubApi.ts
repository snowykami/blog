const API_BASE = "https://blogapi.sfkm.me";

export async function getRepoTrendIssues() {
    const url = API_BASE + "/trends";
    const response = await fetch(url);
    return response.json();
}

export async function getIssueComments(issueUrl: string) {
    const queryParam = {
        url: issueUrl,
    }
    const url = new URL(`${API_BASE}/comments`);
    url.search = new URLSearchParams(queryParam).toString();
    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
}