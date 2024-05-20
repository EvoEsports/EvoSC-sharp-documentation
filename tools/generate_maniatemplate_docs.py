import argparse
import os
from pathlib import Path
import re
import xml.etree.ElementTree as ET

def clean_xml_tags(s):
    return s.replace("<", "&lt;").replace(">", "&gt;")

def parse_file(file):
    try:
        f = open(file, "r")
        contents = f.read()
        f.close()

        parser = ET.XMLParser(target=ET.TreeBuilder(insert_comments=True))
        xml = "<root>" + contents + "</root>"

        matches = re.findall(r"\w+=\"[^\"]+\"", xml)

        for match in matches:
            old = str(match)
            new = clean_xml_tags(old)
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
                    "description": clean_xml_tags(str(description).strip()),
                    "type": type,
                    "default": str(default)
                }]

            previous = node
    except Exception as e:
        print("Failed to read component: " + str(file))
        raise e
    
    return (description, props)

VITE_PATH = os.path.realpath(os.path.join(os.path.join(os.path.dirname(__file__), '../'), 'docs/development/modules/manialinks/components'))
NAMESPACES_INCLUDED = [
    'EvoSC.Containers',
    'EvoSC.Controls',
    'EvoSC.Drawing',
]

parser = argparse.ArgumentParser("ManiaTemplates Documentation Generator")

parser.add_argument('-p', '--project', required=True, help='Root path to the EvoSC# project.')
parser.add_argument('-o', '--output-dir', default=VITE_PATH, help='Output directory of the generated docs.')

args = parser.parse_args()

if not os.path.exists(args.project):
    raise 'Project path does not exist'

coreTemplatesPath = os.path.realpath(os.path.join(args.project, 'src/EvoSC.Manialinks/Templates'))

components = {}

for root, subdirs, files in os.walk(coreTemplatesPath):
    for file in files:
        # get file namespace
        fileSplit = os.path.splitext(file)
        
        if fileSplit[1] != ".mt":
            continue
        
        match = re.search(r"EvoSC.Manialinks/Templates(/(.*))?", root)
        
        if not match:
            continue
        
        namespace = "EvoSC."
        
        if match.group(2):
           namespace += match.group(2).replace('/', '.') + '.'
        
        namespace += fileSplit[0]
        
        namespaceParts = namespace.split('.')
    

        # parse component info
        desc, props = parse_file(os.path.join(root, file))
        
        components[namespace] = {
            "desc": clean_xml_tags(str(desc).strip()),
            "props": props,
            "name": fileSplit[0]
        }


for namespace in components:
    namespaceAllowed = False
    for allowedNamespace in NAMESPACES_INCLUDED:
        if namespace.startswith(allowedNamespace):
            namespaceAllowed = True
            break
        
    if not namespaceAllowed:
        continue
    
    
    component = components[namespace]
    
    pageContents = "# " + component["name"] + "\n"
    pageContents += component["desc"] + "\n\n"
    
    pageContents += "## Import\n"
    pageContents += "```xml:no-line-numbers\n"
    pageContents += "<import component=\"" + namespace + "\" as=\"" + component["name"] + "\" />\n"
    pageContents += "```\n\n"
    
    pageContents += "## Properties\n"
    pageContents += "| Name | Type | Default | Description |\n"
    pageContents += "|------|------|---------|-------------|\n"
    
    for prop in component["props"]:
        pageContents += "| **`" + prop["name"] + "`** | [`" + prop["type"] + "`](#) | `" + prop["default"] + "` | " + prop["description"] + " |"
        pageContents += "\n"
    
    filePath = os.path.join(args.output_dir, component["name"].lower() + ".md")
    f = open(filePath, "w")
    f.write(pageContents)
    f.close()
