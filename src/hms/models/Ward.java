package hms.models;

import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
public class Ward extends Room {

    public Ward(String wardName, int capacity) {
        super(wardName, capacity);
    }

    @Override
    public boolean allocate(Patient patient) {
        if (isFull()) {
            System.out.println("Ward FULL — cannot allocate: " + patient.getName());
            return false;
        }
        patients.add(patient);
        return true;
    }

    @Override
    public String displayStatus() {
        return "Ward: " + patients.size() + "/" + capacity;
    }
}
