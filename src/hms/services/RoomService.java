package hms.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hms.models.Room;
import hms.repositories.RoomRepository;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room allocateRoom(Room r) {
        return roomRepository.save(r);
    }

    public Room vacateRoom(int num) {
        Room room = roomRepository.findByRoomNumber(num).orElseThrow(() -> new RuntimeException("Room not found"));
        room.setStatus("VACANT");
        room.setPatientId(null);
        return roomRepository.save(room);
    }
}
