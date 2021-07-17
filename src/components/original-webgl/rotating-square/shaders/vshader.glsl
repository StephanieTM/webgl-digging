attribute vec4 vPosition;
uniform float theta;

void main() {
  float sinTheta = sin(theta);
  float cosTheta = cos(theta);

  gl_Position.x = vPosition.x * cosTheta - vPosition.y * sinTheta;
  gl_Position.y = vPosition.x * sinTheta + vPosition.y * cosTheta;
  gl_Position.z = 0.0;
  gl_Position.w = 1.0;
}
