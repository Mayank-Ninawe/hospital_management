package hms.models;

import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
public class Nurse extends Person {

    private String ward;
    private String shift;
    private String certification;
    private String status;

    public Nurse(String id, String name, int age,
                 String ward, String shift,
                 String certification, String status) {
        super(id, name, age);
        this.ward = ward;
        this.shift = shift;
        this.certification = certification;
        this.status = status;
    }

    public String getWard() { return ward; }
    public String getShift() { return shift; }
    public String getCertification() { return certification; }
    public String getStatus() { return status; }

    @Override
    public String displayInfo() {
        return "Nurse: " + getName()
                + " | Ward: " + ward
                + " | Shift: " + shift
                + " | " + certification;
    }
}
