import os  
 
import java.util.List; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.http.HttpStatus; 
import org.springframework.http.ResponseEntity; 
import org.springframework.web.bind.annotation.*; 
import hms.models.Patient; 
import hms.services.PatientService; 
@RestController 
@RequestMapping("/api/patients") 
@CrossOrigin(origins = "http://localhost:5173") 
public class PatientController { 
    @Autowired private PatientService patientService; 
    @GetMapping public ResponseEntity<List<Patient>> getAllPatients() { return ResponseEntity.ok(patientService.getAllPatients()); } 
    @PostMapping public ResponseEntity<Patient> addPatient(@RequestBody Patient patient) { return ResponseEntity.status(HttpStatus.CREATED).body(patientService.addPatient(patient)); } 
    @PutMapping("/{id}/discharge") public ResponseEntity<Patient> dischargePatient(@PathVariable Long id) { return ResponseEntity.ok(patientService.dischargePatient(id)); } 
with open("src/hms/controllers/PatientController.java", "w") as f: f.write(patient_ctrl) 
