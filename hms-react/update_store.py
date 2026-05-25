import os

os.chdir(r'C:\Users\LOQ\IdeaProjects\project1\HospitalManagementSystem\hms-react')
with open(r'src\store\hmsStore.ts', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("headers: { 'Content-Type': 'application/json' }", "headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + useAuthStore.getState().token }")
text = text.replace("method: 'PUT' }", "method: 'PUT', headers: { 'Authorization': 'Bearer ' + useAuthStore.getState().token } }")
text = text.replace("method: 'DELETE' }", "method: 'DELETE', headers: { 'Authorization': 'Bearer ' + useAuthStore.getState().token } }")

text = text.replace('fetch(`${API_BASE}/patients`)', 'fetch(`${API_BASE}/patients`, { headers: { "Authorization": "Bearer " + useAuthStore.getState().token } })')
text = text.replace('fetch(`${API_BASE}/doctors`)', 'fetch(`${API_BASE}/doctors`, { headers: { "Authorization": "Bearer " + useAuthStore.getState().token } })')

if 'import { useAuthStore }' not in text:
    text = text.replace("import { create } from 'zustand';", "import { create } from 'zustand';\nimport { useAuthStore } from './authStore';")

with open(r'src\store\hmsStore.ts', 'w', encoding='utf-8') as f:
    f.write(text)
