import testDataJson from '../data/test_trends.json';
import commentsDataJson from '../data/test_comments.json';

const OWNER = 'snowykami';
const REPO = 'blog';
//  https://api.github.com/repos/OWNER/REPO/issues
const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;

export async function getRepoTrendIssues() {
    const queryParam = {
        labels: 'trend',
        state: 'closed',
    }
    const url = new URL(`${API_BASE}/issues`);
    url.search = new URLSearchParams(queryParam).toString();
    const response = await fetch(url.toString());
    console.log(url.toString());
    return response.json();
}

export async function getRepoTrendIssuesTest() {
    return testDataJson;
}

export async function getIssueComments(number: number) {
    const url = `${API_BASE}/issues/${number}/comments`;
    console.log(url);
    return fetch(url).then((res) => res.json());
}

export async function getIssueCommentsTest(number: number) {
    return commentsDataJson;
}