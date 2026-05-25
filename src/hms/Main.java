package hms;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import java.net.URL;

public class Main extends Application {

    @Override
    public void start(Stage stage) throws Exception {

        // Relative path — loads from same package as Main.java (hms/)
        URL fxmlUrl = getClass().getResource("hms.fxml");

        if (fxmlUrl == null) {
            throw new RuntimeException("FXML not found at hms/hms.fxml");
        }

        FXMLLoader loader = new FXMLLoader(fxmlUrl);
        Parent root = loader.load();

        Scene scene = new Scene(root, 1100, 700);
        stage.setTitle("MediCore Hospital Management System");
        stage.setScene(scene);
        stage.setMinWidth(1000);
        stage.setMinHeight(650);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}