const fs = require('fs');
let code = fs.readFileSync('pom.xml', 'utf8');
code = code.replace('<modelVersion>4.0.0</modelVersion>', '<modelVersion>4.0.0</modelVersion>\n    <parent>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-parent</artifactId>\n        <version>3.2.5</version>\n    </parent>');
code = code.replace('<dependencies>', '<dependencies>\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-web</artifactId>\n        </dependency>');
code = code.replace(/<plugin>[\s\S]*?<artifactId>maven-compiler-plugin<\/artifactId>[\s\S]*?<\/plugin>/, '<plugin>\n                <groupId>org.springframework.boot</groupId>\n                <artifactId>spring-boot-maven-plugin</artifactId>\n            </plugin>');
code = code.replace(/<plugin>[\s\S]*?<artifactId>javafx-maven-plugin<\/artifactId>[\s\S]*?<\/plugin>/, '');
fs.writeFileSync('pom.xml', code);