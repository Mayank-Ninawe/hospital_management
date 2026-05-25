package hms.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Transient;
import jakarta.persistence.Column;
import lombok.NoArgsConstructor;
import java.util.ArrayList;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@NoArgsConstructor
public abstract class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_number")
    protected int roomNumber;

    @Column(name = "ward_name")
    protected String wardName;
    protected int capacity;

    @Column(name = "patient_id")
    protected Long patientId;
    protected String status;

    @Transient
    protected ArrayList<Patient> patients = new ArrayList<>();

    public Room(String wardName, int capacity) {
        this.wardName = wardName;
        this.capacity = capacity;
    }

    public Long getId() { return id; }
    public int getRoomNumber() { return roomNumber; }
    public void setRoomNumber(int roomNumber) { this.roomNumber = roomNumber; }
    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public abstract boolean allocate(Patient patient);
    public abstract String displayStatus();

    public int getCapacity() { return capacity; }
    public int getCurrentCount() { return patients.size(); }
    public boolean isFull() { return patients.size() >= capacity; }
    public ArrayList<Patient> getPatients() { return patients; }

    public void removePatient(Patient p) {
        patients.remove(p);
    }
}
