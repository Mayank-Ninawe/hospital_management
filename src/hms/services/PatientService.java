package hms.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hms.models.Patient;
import hms.models.Room;
import hms.repositories.PatientRepository;
import hms.repositories.RoomRepository;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private RoomRepository roomRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient addPatient(Patient p) {
        p.setStatus("ADMITTED");
        return patientRepository.save(p);
    }

    public Patient dischargePatient(Long id) {
        Patient patient = patientRepository.findById(id).orElseThrow(() -> new RuntimeException("Patient not found"));
        patient.setStatus("DISCHARGED");
        
        Room room = roomRepository.findByPatientId(id).orElse(null);
        if (room != null) {
            room.setPatientId(null);
            room.setStatus("VACANT");
            roomRepository.save(room);
        }
        
        return patientRepository.save(patient);
    }
}
