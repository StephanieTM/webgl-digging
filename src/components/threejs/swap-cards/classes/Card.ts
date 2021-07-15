import * as THREE from 'three';
import cardImg from '../assets/card.png';

export interface ICardProps {
  position: THREE.Vector3;
  id: string;
  number: number;
  raycaster: React.MutableRefObject<THREE.Raycaster>;
  mouse: React.MutableRefObject<THREE.Vector2 | undefined>;
}

export class Card {
  private mesh: THREE.Mesh;
  private textMesh: THREE.Mesh;
  object: THREE.Mesh;
  position: THREE.Vector3;
  id: string;
  number: number;
  raycaster: React.MutableRefObject<THREE.Raycaster>;
  mouse: React.MutableRefObject<THREE.Vector2 | undefined>;

  constructor(props: ICardProps) {
    const { position, id, number, raycaster, mouse } = props;

    this.position = position;
    this.id = id;
    this.number = number;
    this.raycaster = raycaster;
    this.mouse = mouse;
    this.initMesh();
    this.initText();
    this.mergeObject();
  }

  private initMesh(): void {
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 0.0001);
    const texture = new THREE.TextureLoader().load(cardImg);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 16;
    texture.encoding = THREE.sRGBEncoding;
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, color: '#fff' });
    const whiteMat = new THREE.MeshBasicMaterial({ color: '#fff' });
    this.mesh = new THREE.Mesh(geometry, [whiteMat, whiteMat, whiteMat, whiteMat, material, whiteMat]);
    this.mesh.name = `${this.id}-mesh`;
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
  }

  private initText(): void {
    const text = `${this.number}`;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const textWidth = 100;
    const textHeight = 100;
    canvas.width = textWidth;
    canvas.height = textHeight;
    context.font = `normal 600 ${textWidth}px monospace`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#f881aa';
    context.fillText(text, textWidth/2, textHeight/2);
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const geometry = new THREE.PlaneGeometry(0.35, 0.35);
    const textMesh = new THREE.Mesh(geometry, material);
    textMesh.position.set(this.position.x - 0.25, this.position.y + 0.4, this.position.z + 0.0001);
    textMesh.name = `${this.id}-text`
    this.textMesh = textMesh;
  }

  private mergeObject(): void {
    this.object = new THREE.Mesh();
    this.object.add(this.mesh, this.textMesh);
    this.object.name = this.id;
  }

  scaleUp(): void {
    this.object.scale.set(1.05, 1.05, 1.05);
  }

  scaleDown(): void {
    this.object.scale.set(1, 1, 1);
  }

  doRaycaster(): void {
    const intersects = this.raycaster.current.intersectObjects(this.object.children, true);
    if (intersects.length) {
      this.scaleUp();
    } else {
      this.scaleDown();
    }
  }
}
