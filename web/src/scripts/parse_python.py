#parse_python.py
import ast
import json
import sys

def parse_python_code(code):
    try:
        tree = ast.parse(code)
        return ast.dump(tree)
    except SyntaxError as e:
        return json.dumps({"error": f"Error parsing Python code: {str(e)}"})

if __name__ == "__main__":
    # Read code from stdin (fixing the IndexError issue)
    code = sys.stdin.read()  
    parsed_data = parse_python_code(code)
    print(json.dumps(parsed_data))  # Output as JSON
