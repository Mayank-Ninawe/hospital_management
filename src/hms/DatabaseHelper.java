package hms;

import hms.models.Appointment;
import hms.models.Doctor;
import hms.models.Nurse;
import hms.models.Patient;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class DatabaseHelper {

    private static Connection conn = null;

    private static Connection getConn() {
        try {
            if (conn == null || conn.isClosed()) {
                conn = DatabaseConnection.getConnection();
            }
        } catch (SQLException e) {
            System.out.println("❌ Error checking DB connection: " + e.getMessage());
        }
        return conn;
    }

    private static boolean isDbAvailable() {
        Connection connection = getConn();
        if (connection == null) {
            System.out.println("❌ Database connection is null. Check MySQL driver/JAR and DB credentials.");
            return false;
        }
        return true;
    }

    // ============================
    // DOCTORS
    // ============================

    public static void saveDoctor(Doctor d) {
        if (!isDbAvailable()) return;

        String sql = "INSERT INTO doctors VALUES (?,?,?,?,?,?,?,?) " +
                "ON DUPLICATE KEY UPDATE name=?, specialization=?, status=?, department=?, timing=?, phone=?, age=?";

        try (PreparedStatement ps = getConn().prepareStatement(sql)) {
            ps.setString(1, d.getId());
            ps.setString(2, d.getName());
            ps.setInt(3, d.getAge());
            ps.setString(4, d.getSpecialization());
            ps.setString(5, d.getDepartment());
            ps.setString(6, d.getTiming());
            ps.setString(7, d.getStatus());
            ps.setString(8, d.getPhone());

            ps.setString(9, d.getName());
            ps.setString(10, d.getSpecialization());
            ps.setString(11, d.getStatus());
            ps.setString(12, d.getDepartment());
            ps.setString(13, d.getTiming());
            ps.setString(14, d.getPhone());
            ps.setInt(15, d.getAge());

            ps.executeUpdate();
            System.out.println("✅ Doctor saved: " + d.getName());
        } catch (SQLException e) {
            System.out.println("❌ saveDoctor error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static ArrayList<Doctor> loadDoctors() {
        ArrayList<Doctor> list = new ArrayList<>();
        if (!isDbAvailable()) return list;

        String sql = "SELECT * FROM doctors";
        try (Statement st = getConn().createStatement();
             ResultSet rs = st.executeQuery(sql)) {

            while (rs.next()) {
                list.add(new Doctor(
                        rs.getString("id"),
                        rs.getString("name"),
                        rs.getInt("age"),
                        rs.getString("specialization"),
                        rs.getString("department"),
                        rs.getString("timing"),
                        rs.getString("status"),
                        rs.getString("phone")
                ));
            }
        } catch (SQLException e) {
            System.out.println("❌ loadDoctors error: " + e.getMessage());
            e.printStackTrace();
        }
        return list;
    }

    public static void deleteDoctor(String id) {
        if (!isDbAvailable()) return;

        String sql = "DELETE FROM doctors WHERE id=?";
        try (PreparedStatement ps = getConn().prepareStatement(sql)) {
            ps.setString(1, id);
            ps.executeUpdate();
            System.out.println("✅ Doctor deleted: " + id);
        } catch (SQLException e) {
            System.out.println("❌ deleteDoctor error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ============================
    // PATIENTS
    // ============================

    public static void savePatient(Patient p) {
        if (!isDbAvailable()) return;

        String sql = "INSERT INTO patients VALUES (?,?,?,?,?,?,?,?,?,?) " +
                "ON DUPLICATE KEY UPDATE name=?, age=?, gender=?, diagnosis=?, assigned_doctor=?, room_number=?, blood_group=?, contact=?, is_admitted=?";

        try (PreparedStatement ps = getConn().prepareStatement(sql)) {
            ps.setString(1, p.getId());
            ps.setString(2, p.getName());
            ps.setInt(3, p.getAge());
            ps.setString(4, p.getGender());
            ps.setString(5, p.getDiagnosis());
            ps.setString(6, p.getAssignedDoctor());
            ps.setString(7, p.getRoomNumber());
            ps.setString(8, p.getBloodGroup());
            ps.setString(9, p.getContact());
            ps.setBoolean(10, p.getIsAdmitted());

            ps.setString(11, p.getName());
            ps.setInt(12, p.getAge());
            ps.setString(13, p.getGender());
            ps.setString(14, p.getDiagnosis());
            ps.setString(15, p.getAssignedDoctor());
            ps.setString(16, p.getRoomNumber());
            ps.setString(17, p.getBloodGroup());
            ps.setString(18, p.getContact());
            ps.setBoolean(19, p.getIsAdmitted());

            ps.executeUpdate();
            System.out.println("✅ Patient saved: " + p.getName());
        } catch (SQLException e) {
            System.out.println("❌ savePatient error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static ArrayList<Patient> loadPatients() {
        ArrayList<Patient> list = new ArrayList<>();
        if (!isDbAvailable()) return list;

        String sql = "SELECT * FROM patients";
        try (Statement st = getConn().createStatement();
             ResultSet rs = st.executeQuery(sql)) {

            while (rs.next()) {
                Patient pt = new Patient(
                        rs.getString("id"),
                        rs.getString("name"),
                        rs.getInt("age"),
                        rs.getString("gender"),
                        rs.getString("diagnosis"),
                        rs.getString("assigned_doctor"),
                        rs.getString("room_number"),
                        rs.getString("blood_group"),
                        rs.getString("contact")
                );

                if (!rs.getBoolean("is_admitted")) {
                    pt.discharge();
                }

                list.add(pt);
            }
        } catch (SQLException e) {
            System.out.println("❌ loadPatients error: " + e.getMessage());
            e.printStackTrace();
        }
        return list;
    }

    public static void deletePatient(String id) {
        if (!isDbAvailable()) return;

        String sql = "DELETE FROM patients WHERE id=?";
        try (PreparedStatement ps = getConn().prepareStatement(sql)) {
            ps.setString(1, id);
            ps.executeUpdate();
            System.out.println("✅ Patient deleted: " + id);
        } catch (SQLException e) {
            System.out.println("❌ deletePatient error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ============================
    // NURSES
    // ============================

    public static void saveNurse(Nurse n) {
        if (!isDbAvailable()) return;

        String sql = "INSERT INTO nurses VALUES (?,?,?,?,?,?,?) " +
                "ON DUPLICATE KEY UPDATE name=?, age=?, ward=?, shift=?, certification=?, status=?";

        try (PreparedStatement ps = getConn().prepareStatement(sql)) {
            ps.setString(1, n.getId());
            ps.setString(2, n.getName());
            ps.setInt(3, n.getAge());
            ps.setString(4, n.getWard());
            ps.setString(5, n.getShift());
            ps.setString(6, n.getCertification());
            ps.setString(7, n.getStatus());

            ps.setString(8, n.getName());
            ps.setInt(9, n.getAge());
            ps.setString(10, n.getWard());
            ps.setString(11, n.getShift());
            ps.setString(12, n.getCertification());
            ps.setString(13, n.getStatus());

            ps.executeUpdate();
            System.out.println("✅ Nurse saved: " + n.getName());
        } catch (SQLException e) {
            System.out.println("❌ saveNurse error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static ArrayList<Nurse> loadNurses() {
        ArrayList<Nurse> list = new ArrayList<>();
        if (!isDbAvailable()) return list;

        String sql = "SELECT * FROM nurses";
        try (Statement st = getConn().createStatement();
             ResultSet rs = st.executeQuery(sql)) {

            while (rs.next()) {
                list.add(new Nurse(
                        rs.getString("id"),
                        rs.getString("name"),
                        rs.getInt("age"),
                        rs.getString("ward"),
                        rs.getString("shift"),
                        rs.getString("certification"),
                        rs.getString("status")
                ));
            }
        } catch (SQLException e) {
            System.out.println("❌ loadNurses error: " + e.getMessage());
            e.printStackTrace();
        }
        return list;
    }

    public static void deleteNurse(String id) {
        if (!isDbAvailable()) return;

        String sql = "DELETE FROM nurses WHERE id=?";
        try (PreparedStatement ps = getConn().prepareStatement(sql)) {
            ps.setString(1, id);
            ps.executeUpdate();
            System.out.println("✅ Nurse deleted: " + id);
        } catch (SQLException e) {
            System.out.println("❌ deleteNurse error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ============================
    // APPOINTMENTS
    // ============================

    public static void saveAppointment(Appointment a) {
        if (!isDbAvailable()) return;

        String sql = "INSERT INTO appointments VALUES (?,?,?,?,?,?,?,?) " +
                "ON DUPLICATE KEY UPDATE patient_name=?, doctor_name=?, date=?, time=?, type=?, notes=?, status=?";

        try (PreparedStatement ps = getConn().prepareStatement(sql)) {
            ps.setString(1, a.getAppointmentId());
            ps.setString(2, a.getPatientName());
            ps.setString(3, a.getDoctorName());
            ps.setString(4, a.getDate());
            ps.setString(5, a.getTime());
            ps.setString(6, a.getType());
            ps.setString(7, a.getNotes());
            ps.setString(8, a.getStatus());

            ps.setString(9, a.getPatientName());
            ps.setString(10, a.getDoctorName());
            ps.setString(11, a.getDate());
            ps.setString(12, a.getTime());
            ps.setString(13, a.getType());
            ps.setString(14, a.getNotes());
            ps.setString(15, a.getStatus());

            ps.executeUpdate();
            System.out.println("✅ Appointment saved: " + a.getAppointmentId());
        } catch (SQLException e) {
            System.out.println("❌ saveAppointment error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static ArrayList<Appointment> loadAppointments() {
        ArrayList<Appointment> list = new ArrayList<>();
        if (!isDbAvailable()) return list;

        String sql = "SELECT * FROM appointments";
        try (Statement st = getConn().createStatement();
             ResultSet rs = st.executeQuery(sql)) {

            while (rs.next()) {
                Appointment ap = new Appointment(
                        rs.getString("appointment_id"),
                        rs.getString("patient_name"),
                        rs.getString("doctor_name"),
                        rs.getString("date"),
                        rs.getString("time"),
                        rs.getString("type"),
                        rs.getString("notes")
                );
                ap.setStatus(rs.getString("status"));
                list.add(ap);
            }
        } catch (SQLException e) {
            System.out.println("❌ loadAppointments error: " + e.getMessage());
            e.printStackTrace();
        }
        return list;
    }

    public static void deleteAppointment(String appointmentId) {
        if (!isDbAvailable()) return;

        String sql = "DELETE FROM appointments WHERE appointment_id=?";
        try (PreparedStatement ps = getConn().prepareStatement(sql)) {
            ps.setString(1, appointmentId);
            ps.executeUpdate();
            System.out.println("✅ Appointment deleted: " + appointmentId);
        } catch (SQLException e) {
            System.out.println("❌ deleteAppointment error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}