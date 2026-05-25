package hms.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
public class ICU extends Room {

    @Column(name = "ventilator_count")
    private int ventilatorCount;
    
    @Column(name = "monitor_count")
    private int monitorCount;
    
    @Column(name = "monitor_status")
    private String monitorStatus;

    public ICU(int capacity) {
        super("Intensive Care Unit", capacity);
        this.ventilatorCount = 10;
        this.monitorCount = 10;
        this.monitorStatus = "Operational";
    }

    public int getVentilatorCount() { return ventilatorCount; }
    public int getMonitorCount() { return monitorCount; }
    public String getMonitorStatus() { return monitorStatus; }

    @Override
    public boolean allocate(Patient patient) {
        if (isFull()) {
            System.out.println("ICU FULL — cannot allocate: " + patient.getName());
            return false;
        }
        patients.add(patient);
        System.out.println("ICU.allocate() @Override → " + patient.getName() + " admitted");
        return true;
    }

    @Override
    public String displayStatus() {
        return "ICU: " + patients.size() + "/" + capacity
                + " | Ventilators: " + ventilatorCount
                + " | Monitors: " + monitorStatus;
    }
}
