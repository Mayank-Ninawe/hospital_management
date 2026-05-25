package hms.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.FetchType;
import jakarta.persistence.Column;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
public class Patient extends Person {

    private String diagnosis;
    
    @Column(name = "room_number")
    private String roomNumber;
    
    @Column(name = "is_admitted")
    private boolean isAdmitted;
    private String gender;
    
    @Column(name = "blood_group")
    private String bloodGroup;
    private String contact;`n    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = true)
    private Doctor assignedDoctor;

    public Patient(String id, String name, int age, String gender,
                   String diagnosis, String assignedDoctor,
                   String roomNumber, String bloodGroup, String contact) {
        super(id, name, age);
        this.diagnosis = diagnosis;
        this.roomNumber = roomNumber;
        this.isAdmitted = true;
        this.gender = gender;
        this.bloodGroup = bloodGroup;
        this.contact = contact;
    }

    public void admitPatient(String room) {
        this.roomNumber = room;
        this.isAdmitted = true;
    }

    public void discharge() {
        this.isAdmitted = false;
        this.roomNumber = "Discharged";
    }

    public String getDiagnosis() { return diagnosis; }
    public String getRoomNumber() { return roomNumber; }
    public boolean getIsAdmitted() { return isAdmitted; }
    public String getGender() { return gender; }
    public String getBloodGroup() { return bloodGroup; }
    public String getContact() { return contact; }
    public Doctor getAssignedDoctor() { return assignedDoctor; }
    public void setRoomNumber(String r) { this.roomNumber = r; }`n    public String getStatus() { return status; }`n    public void setStatus(String status) { this.status = status; }

    @Override
    public String displayInfo() {
        return "Patient: " + getName()
                + " | Age: "  + getAge()
                + " | Room: " + roomNumber
                + " | Dx: "   + diagnosis
                + " | Status: " + (isAdmitted ? "Admitted" : "Discharged");
    }
}
