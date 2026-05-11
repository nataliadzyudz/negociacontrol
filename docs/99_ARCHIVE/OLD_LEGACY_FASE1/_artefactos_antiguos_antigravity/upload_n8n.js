const fs = require('fs');

const workflowStr = fs.readFileSync('new_workflow_diagnostico.json', 'utf8');
const original = JSON.parse(workflowStr);

const payload = {
    name: original.name,
    nodes: original.nodes,
    connections: original.connections,
    settings: {}
};

fetch("https://n8n-nc-n8n.wmd3t3.easypanel.host/api/v1/workflows/KIDMtqzjYPMQlDDz", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "X-N8N-API-KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwODBhMzBhMi05YjY0LTQxNTktYWQxNS1kYTY3NzhhMGY5NDgiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiNjhiMzU2MTUtNDg4Ny00NzdjLWFiNGItYWIyZTZmNjUzYjczIiwiaWF0IjoxNzc3OTA5OTAyfQ.rK1I6ZlaSwejezDAx5-J3y4IfW77AcJP72ahZSqMZ2Y"
    },
    body: JSON.stringify(payload)
})
.then(async res => {
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
})
.catch(err => console.error("Error:", err));
