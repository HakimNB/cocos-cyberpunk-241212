import { _decorator, Component, math, Node, v3, Vec3, CCFloat, CapsuleCharacterController, game } from 'cc';
import { UtilActor, UtilVec3 } from '../../core/util/util';
import { DataLevelInst } from '../data/data-core';
const { ccclass, property } = _decorator;

let tempRotationSideVector = v3(0, 0, 0);

let gravityValue = -9.8;

@ccclass('ActorMoveCCT')
export class ActorMoveCCT extends Component {

    @property({ type: CCFloat, tooltip: 'Move Speed. ' })
    speed = 1;

    @property({ tooltip: 'Jump Force.' })
    jumpForce = v3(0, 6.0, 0);

    @property({ type: CCFloat, tooltip: 'Move smooth value.' })
    smoothMove = 5;

    @property({ type: CCFloat, tooltip: 'Default angle value' })
    angleVertical = 0;

    @property({ type: CapsuleCharacterController })
    controller: CapsuleCharacterController;

    velocity = v3(0, 0, 0);
    velocityLocal = v3(0, 0, 0);

    inputDirection = new Vec3(0, 0, 0);

    speedY = 0;

    currentDirection = v3(0, 0, 0);
    direction = v3(0, 0, 0);
    angleHead = 0;

    moveVector = v3(0, 0, 0);

    @property
    angleVerticalMax = 30;

    @property
    angleVerticalMin = -30;

    @property
    faceMove = true;

    angle = 0;

    isJump = false;

    isStopMove = false;

    isGround = false;

    start () {

        this.controller = this.getComponent(CapsuleCharacterController);
        this.node.setRotationFromEuler(0, 180, 0);
        this.onRotation(180, 0);
    }

    onEnable () { }

    lateUpdate (deltaTime: number) {

        if (DataLevelInst.stop || this.isStopMove) {
            this.stop();
            return;
        }

        this.movePosition(deltaTime);
        this.moveRotation();
    }

    movePosition (deltaTime: number) {

        //Lerp input direction.
        Vec3.lerp(this.velocityLocal, this.velocityLocal, this.inputDirection, deltaTime * this.smoothMove);
        UtilVec3.copy(this.velocity, this.velocityLocal);

        //rotate y.
        if (this.faceMove)
            Vec3.rotateY(this.velocity, this.velocity, Vec3.ZERO, math.toRadian(this.node.eulerAngles.y));

        // Calculate slope.
        UtilActor.calculateSlope(this.node, this.velocity);

        // Calculate gravity.
        this.isGround = this.controller.onGround;
        if (!this.isGround) {
            this.speedY += gravityValue * game.deltaTime;
        }

        if (this.isGround && this.speedY < 0) {
            this.speedY = 0;
        }

        this.velocity.y = this.speedY;

        // delta Vector =  Velocity * deltaTime
        Vec3.copy(this.moveVector, this.velocity).multiplyScalar(game.deltaTime);

        // Character controller move vector.
        this.controller.move(this.moveVector);

    }

    moveToPoint (position: Vec3) {
        this.node.setWorldPosition(position);
    }

    moveRotation () {
        UtilVec3.copy(this.currentDirection, this.direction);
        this.angle = math.toDegree(Math.abs(Vec3.angle(this.currentDirection, this.node.forward)));
        if (this.angle > 0.001) {
            UtilVec3.copy(tempRotationSideVector, this.currentDirection);
            const side = Math.sign(-tempRotationSideVector.cross(this.node.forward).y);
            const angle = side * this.angle + this.node.eulerAngles.y;
            this.node.setRotationFromEuler(0, angle, 0);
        }
    }

    directionRotation () {
        UtilVec3.copy(this.currentDirection, this.direction);
        this.angle = math.toDegree(Math.abs(Vec3.angle(this.currentDirection, this.node.forward)));
        if (this.angle > 0.001) {
            UtilVec3.copy(tempRotationSideVector, this.currentDirection);
            const side = Math.sign(-tempRotationSideVector.cross(this.node.forward).y);
            const angle = side * this.angle + this.node.eulerAngles.y;
            this.node.setRotationFromEuler(0, angle, 0);
        }
    }

    moveDirection (direction: Vec3) {
        UtilVec3.copy(this.inputDirection, direction);
        this.inputDirection.multiplyScalar(this.speed);
    }

    jump () {
        this.speedY = this.jumpForce.y;
        console.log(this.speedY);
    }

    onRotation (x: number, y: number) {
        this.angleHead += x;
        this.direction.z = -Math.cos(Math.PI / 180.0 * this.angleHead);
        this.direction.x = Math.sin(Math.PI / 180.0 * this.angleHead);
        this.angleVertical -= y;
        if (this.angleVertical >= this.angleVerticalMax)
            this.angleVertical = this.angleVerticalMax;

        if (this.angleVertical <= this.angleVerticalMin)
            this.angleVertical = this.angleVerticalMin;
    }

    onDirection (x: number, y: number, z: number) {

        this.direction.x = x;
        this.direction.z = z;

        this.angleVertical = y;

        if (this.angleVertical >= this.angleVerticalMax)
            this.angleVertical = this.angleVerticalMax;

        if (this.angleVertical <= this.angleVerticalMin)
            this.angleVertical = this.angleVerticalMin;

    }

    stop () {
        this.velocity.x = 0;
        this.velocity.z = 0;
        this.velocity.y = 0;
    }


}
