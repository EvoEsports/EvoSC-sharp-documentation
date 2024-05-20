import xml.etree.ElementTree as ET
import re

f = open("Container.mt", "r")
contents = f.read()
f.close()

parser = ET.XMLParser(target=ET.TreeBuilder(insert_comments=True))
xml = "<root>" + contents + "</root>"

matches = re.findall(r"\w+=\"[^\"]+\"", xml)

for match in matches:
    old = str(match)
    new = old.replace("<", "&lt;").replace(">", "&gt;")
    xml = xml.replace(old, new)

tree = ET.fromstring(xml, parser)

descNode = tree.find("./")
description = ""

if descNode is not None and "function Comment" in str(descNode.tag):
    description = descNode.text

props = []

previous = None
for node in tree.find("./component").iter():
    if node.tag == "property":
        type = node.attrib["type"]
        name = node.attrib["name"]
        default = None
        description = None
        
        if "default" in node.attrib:
            default = node.attrib["default"]
        
        if previous is not None and "function Comment" in str(previous.tag):
            description = previous.text
        
        props += [{
            "name": name,
            "description": str(description).strip(),
            "type": type,
            "default": str(default)
        }]

    previous = node

print(description)
for prop in props:
    print("[" + prop["type"] + "(" + prop["default"] + ")] " + prop["name"] + ": " + prop["description"])

"""
description = tree.find("./")
props = tree.findall(".//property")

for prop in props:
    print(prop)
    print(prop.find("./parent::*"))
    
    type = prop.attrib["type"]
    name = prop.attrib["name"]
    default = None
    
    if "default" in prop.attrib:
        default = prop.attrib["default"]
    
    print(type + " " + name + " - " + str(default))
    print()
"""
