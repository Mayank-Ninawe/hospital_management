package hms.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Transient;
import lombok.NoArgsConstructor;
import java.util.ArrayList;

@Entity
@NoArgsConstructor
public class EmergencyRoom extends Room {

    @Transient
    private ArrayList<String[]> triageCases = new ArrayList<>();

    public EmergencyRoom(int capacity) {
        super("Emergency Room", capacity);
    }

    @Override
    public boolean allocate(Patient patient) {
        if (isFull()) {
            System.out.println("ER FULL — cannot allocate: " + patient.getName());
            return false;
        }
        patients.add(patient);
        return true;
    }

    public void triage(String patientName, int level, String complaint) {
        triageCases.add(new String[]{ patientName, String.valueOf(level), complaint });
        triageCases.sort((a, b) -> Integer.parseInt(a[1]) - Integer.parseInt(b[1]));
        System.out.println("ER.triage() → Sorted " + triageCases.size() + " cases by severity");
    }

    public ArrayList<String[]> getTriageCases() { return triageCases; }

    @Override
    public String displayStatus() {
        return "Emergency Room: " + patients.size() + "/" + capacity
                + " active cases | Triage queue: " + triageCases.size();
    }
}
