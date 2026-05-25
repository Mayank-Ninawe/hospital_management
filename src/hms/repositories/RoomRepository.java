package hms.repositories;

import hms.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByRoomNumber(int num);`n    Optional<Room> findByPatientId(Long patientId);
}
