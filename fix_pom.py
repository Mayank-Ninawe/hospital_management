import re

with open('pom.xml', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix literal `n
content = content.replace("`n", "\n")

with open('pom.xml', 'w', encoding='utf-8') as f:
    f.write(content)
