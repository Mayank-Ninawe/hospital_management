package hms.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hms.models.Room;
import hms.models.Ward;
import hms.services.RoomService;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // Internal DTO to match frontend Room representation
    public static class RoomDTO {
        public Integer num;
        public String type;
        public String status;
        public String patientId;
        public String patientName;
        public String allocatedAt;
    }

    private RoomDTO mapToDTO(Room room) {
        RoomDTO dto = new RoomDTO();
        dto.num = room.getRoomNumber();
        dto.type = room.getClass().getSimpleName();
        dto.status = room.getStatus() == null ? "VACANT" : room.getStatus();
        dto.patientId = room.getPatientId() != null ? String.valueOf(room.getPatientId()) : null;
        return dto;
    }

    private Room mapToEntity(RoomDTO dto) {
        Room room = new Ward(dto.type, 1); // Mock mapping
        room.setRoomNumber(dto.num);
        room.setStatus(dto.status);
        if (dto.patientId != null) {
            room.setPatientId(Long.parseLong(dto.patientId));
        }
        return room;
    }

    @GetMapping
    public ResponseEntity<List<RoomDTO>> getAllRooms() {
        List<RoomDTO> dtos = roomService.getAllRooms().stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<RoomDTO> addRoom(@RequestBody RoomDTO roomDTO) {
        Room room = mapToEntity(roomDTO);
        Room savedRoom = roomService.allocateRoom(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapToDTO(savedRoom));
    }

    @PutMapping("/{num}/vacate")
    public ResponseEntity<RoomDTO> vacateRoom(@PathVariable String num) {
        Room vacatedRoom = roomService.vacateRoom(Integer.parseInt(num));
        return ResponseEntity.ok(mapToDTO(vacatedRoom));
    }
}