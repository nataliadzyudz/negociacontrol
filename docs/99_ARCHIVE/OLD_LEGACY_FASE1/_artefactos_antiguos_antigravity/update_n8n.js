const fs = require('fs');

const workflowStr = fs.readFileSync('backup_workflow_diagnostico.json', 'utf8');
const workflow = JSON.parse(workflowStr);

// Change position of "Append row in sheet" to make room
const sheetNode = workflow.nodes.find(n => n.name === 'Append row in sheet');
if (sheetNode) {
    sheetNode.position = [800, 0];
}

// Create the IF node
const ifNode = {
  "parameters": {
    "conditions": {
      "options": {
        "caseSensitive": true,
        "leftValue": "",
        "typeValidation": "strict"
      },
      "conditions": [
        {
          "id": "e25f8e65-2178-4cd7-bf53-7b4c6e91ea6b",
          "leftValue": "={{ $json.Consentimiento }}",
          "rightValue": "true",
          "operator": {
            "type": "string",
            "operation": "equals"
          }
        }
      ],
      "combinator": "and"
    },
    "options": {}
  },
  "id": "if-consentimiento-node-12345",
  "name": "Filtro Consentimiento",
  "type": "n8n-nodes-base.if",
  "typeVersion": 3,
  "position": [
    624,
    0
  ]
};

workflow.nodes.push(ifNode);

// Update connections
workflow.connections["Code in JavaScript"] = {
  "main": [
    [
      {
        "node": "Filtro Consentimiento",
        "type": "main",
        "index": 0
      }
    ]
  ]
};

workflow.connections["Filtro Consentimiento"] = {
  "main": [
    [
      {
        "node": "Append row in sheet",
        "type": "main",
        "index": 0
      }
    ]
  ]
};

// Also apply the same to activeVersion
if (workflow.activeVersion && workflow.activeVersion.nodes) {
    const activeSheetNode = workflow.activeVersion.nodes.find(n => n.name === 'Append row in sheet');
    if (activeSheetNode) activeSheetNode.position = [800, 0];
    workflow.activeVersion.nodes.push(ifNode);
    workflow.activeVersion.connections["Code in JavaScript"] = workflow.connections["Code in JavaScript"];
    workflow.activeVersion.connections["Filtro Consentimiento"] = workflow.connections["Filtro Consentimiento"];
}

fs.writeFileSync('new_workflow_diagnostico.json', JSON.stringify(workflow, null, 2));
console.log('Modified workflow saved to new_workflow_diagnostico.json');
