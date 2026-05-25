package hms.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "appointment_id")
    private String appointmentId;

    @Column(name = "patient_name")
    private String patientName;

    @Column(name = "doctor_name")
    private String doctorName;

    @ManyToOne
    @JoinColumn(name="patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name="doctor_id")
    private Doctor doctor;

    private String date;
    private String time;
    private String type;
    private String notes;
    private String status;

    public Appointment(String appointmentId, String patientName,
                       String doctorName, String date, String time,
                       String type, String notes) {
        this.appointmentId = appointmentId;
        this.patientName = patientName;
        this.doctorName = doctorName;
        this.date = date;
        this.time = time;
        this.type = type;
        this.notes = notes;
        this.status = "Scheduled";
    }

    public Long getId() { return id; }
    public String getAppointmentId() { return appointmentId; }
    public String getPatientName() { return patientName; }
    public String getDoctorName() { return doctorName; }
    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }
    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }
    public String getDate() { return date; }
    public String getTime() { return time; }
    public String getType() { return type; }
    public String getNotes() { return notes; }
    public String getStatus() { return status; }
    public void setStatus(String s) { this.status = s; }

    public String displayTiming() {
        return "Appointment #" + appointmentId
                + " | " + patientName
                + " → Dr. " + doctorName
                + " | " + date + " at " + time
                + " | " + type + " | " + status;
    }

    @Override
    public String toString() { return displayTiming(); }
}
