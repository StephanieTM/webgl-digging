attribute vec4 vPosition;
attribute vec4 vColor;
varying vec4 fColor;

void main() {
  fColor = vColor;
  gl_Position = 0.5 * vPosition;
  gl_Position.z = -gl_Position.z;
}
