package hms.models;

import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
public class Doctor extends Person {

    private String specialization;
    private String department;
    private String timing;
    private String status;
    private String phone;

    public Doctor(String id, String name, int age,
                  String specialization, String department,
                  String timing, String status, String phone) {
        super(id, name, age);
        this.specialization = specialization;
        this.department = department;
        this.timing = timing;
        this.status = status;
        this.phone = phone;
    }

    public String getSpecialization() { return specialization; }
    public String getDepartment() { return department; }
    public String getTiming() { return timing; }
    public String getStatus() { return status; }
    public String getPhone() { return phone; }

    public String displayTiming() {
        return getName() + " — " + timing;
    }

    @Override
    public String displayInfo() {
        return "Dr. " + getName()
                + " [" + specialization + "]"
                + " | Dept: " + department
                + " | Timing: " + timing
                + " | Status: " + status;
    }
}
