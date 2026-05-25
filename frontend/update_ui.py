import os
import re

def update_file(filename, is_patient=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add searchTerm state
    if "const [searchTerm, setSearchTerm] = useState('');" not in content:
        content = content.replace("const [isModalOpen, setIsModalOpen] = useState(false);", 
                                  "const [isModalOpen, setIsModalOpen] = useState(false);\n  const [searchTerm, setSearchTerm] = useState('');")

    # 2. Add Search Input above table
    search_ui = """
      <div className="mb-4">
        <LiquidGlassInput 
          placeholder="Search by name..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        />
      </div>
"""
    if is_patient:
        content = content.replace("{/* Patient Table */}", search_ui + "\n      {/* Patient Table */}")
        content = content.replace("patients.map(patient =>", "patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(patient =>")
        content = content.replace("patients.length === 0", "patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0")
        
        # fix strings inside modal logic if necessary (parse to number)
        content = content.replace("id: formData.id,", "id: Number(formData.id),")
        content = content.replace("patient.id === formData.id", "patient.id === Number(formData.id)")
        content = content.replace("(id: string,", "(id: number,")
        content = content.replace("assignedDoctorId: formData.assignedDoctorId || undefined", "assignedDoctorId: formData.assignedDoctorId ? Number(formData.assignedDoctorId) : undefined")
        
        # patient filtering inside Doctors map (id changed)
        content = content.replace("assignedDoc.id === patient.assignedDoctorId", "assignedDoc.id === Number(patient.assignedDoctorId)")
        
    else:
        # Doctors
        if 'hoverable className="p-5 flex flex-col group"' in content:
            content = content.replace("{doctors.length === 0 ?", search_ui + "\n      {doctors.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ?")
            content = content.replace("doctors.map(doc =>", "doctors.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map(doc =>")
        
        # fix strings inside modal logic
        content = content.replace("id: formData.id,", "id: Number(formData.id),")
        content = content.replace("doctors.some(d => d.id === formData.id)", "doctors.some(d => d.id === Number(formData.id))")

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

update_file("src/pages/Patients.tsx", True)
update_file("src/pages/Doctors.tsx", False)
