using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Runtime.CompilerServices;
using OurSonic.Level;
using OurSonic.Tiles;
using OurSonic.Utility;
namespace OurSonic
{
    public class Sonic
    {
        public Rectangle myRec;
        public JsDictionary<int, bool> obtainedRing = new JsDictionary<int, bool>();
        private int oldSign;
        private SonicConstants physicsVariables;
        private int runningTick;
        private SensorManager sensorManager;
        public int sonicLastHitTick;
        private SonicLevel sonicLevel;
        private int ticking;
        [IntrinsicProperty]
        public Watcher Watcher { get; set; }
        [IntrinsicProperty]
        public bool Ticking { get; set; }
        [IntrinsicProperty]
        public double X { get; set; }
        [IntrinsicProperty]
        public double Y { get; set; }
        [IntrinsicProperty]
        public int Rings { get; set; }
        [IntrinsicProperty]
        public bool Debugging { get; set; }
        [IntrinsicProperty]
        public bool Jumping { get; set; }
        [IntrinsicProperty]
        public bool Crouching { get; set; }
        [IntrinsicProperty]
        public bool HoldingLeft { get; set; }
        [IntrinsicProperty]
        public bool HoldingRight { get; set; }
        [IntrinsicProperty]
        public bool HoldingUp { get; set; }
        [IntrinsicProperty]
        public double Xsp { get; set; }
        [IntrinsicProperty]
        public double Ysp { get; set; }
        [IntrinsicProperty]
        public double Gsp { get; set; }
        [IntrinsicProperty]
        public bool Rolling { get; set; }
        [IntrinsicProperty]
        public bool InAir { get; set; }
        [IntrinsicProperty]
        public bool WasInAir { get; set; }
        [IntrinsicProperty]
        public bool HoldingJump { get; set; }
        [IntrinsicProperty]
        public bool JustHit { get; set; }
        [IntrinsicProperty]
        public int HLock { get; set; }
        [IntrinsicProperty]
        public RotationMode Mode { get; set; }
        [IntrinsicProperty]
        public bool Facing { get; set; }
        [IntrinsicProperty]
        public int Breaking { get; set; }
        [IntrinsicProperty]
        public bool Ducking { get; set; }
        [IntrinsicProperty]
        public bool SpinDash { get; set; }
        [IntrinsicProperty]
        public double SpinDashSpeed { get; set; }
        [IntrinsicProperty]
        public int Angle { get; set; }
        [IntrinsicProperty]
        protected bool CurrentlyBall { get; set; }
        [IntrinsicProperty]
        protected string SpriteState { get; set; }
        [IntrinsicProperty]
        protected List<Point> HaltSmoke { get; set; }
        [IntrinsicProperty]
        public bool WasJumping { get; set; }
        /*    
    obtainedRing = [];   
*/

        public Sonic()
        {
            Watcher = new Watcher();

            physicsVariables = SonicConstants.Sonic();

            var sonicManager = SonicManager.Instance;
            sonicLevel = sonicManager.SonicLevel;
            X = sonicLevel.StartPositions[0].X;
            Y = sonicLevel.StartPositions[0].Y;
            sensorManager = new SensorManager();
            HaltSmoke = new List<Point>();
            Rings = 7;
            sensorManager.CreateVerticalSensor("a", -9, 0, 36, "#F202F2");
            sensorManager.CreateVerticalSensor("b", 9, 0, 36, "#02C2F2");
            sensorManager.CreateVerticalSensor("c", -9, 0, -20, "#2D2C21");
            sensorManager.CreateVerticalSensor("d", 9, 0, -20, "#C24222");
            sensorManager.CreateHorizontalSensor("m1", 4, 0, -12, "#212C2E");
            sensorManager.CreateHorizontalSensor("m2", 4, 0, 13, "#22Ffc1");

            SpriteState = "normal";
        }

        public void UpdateMode()
        {
            if (Angle <= 0x22 || Angle >= 0xDE)
                Mode = RotationMode.Floor;
            else if (Angle > 0x22 && Angle < 0x59)
                Mode = RotationMode.LeftWall;
            else if (Angle >= 0x59 && Angle < 0xA1)
                Mode = RotationMode.Ceiling;
            else if (Angle > 0xA1 && Angle < 0xDE)
                Mode = RotationMode.RightWall;
            //        x = _H.floor(x);
            //        y = _H.floor(y);
            myRec = new Rectangle((int) ( X - 5 ), (int) ( Y - 20 ), 5 * 2, 20 * 2);
            if (InAir)
                Mode = RotationMode.Floor;
        }

        public void Tick(SonicLevel sonicLevel, Point scale)
        {
            if (Debugging) {
                var debugSpeed = Watcher.Multiply(15);

                if (HoldingRight)
                    X += debugSpeed;
                if (HoldingLeft)
                    X -= debugSpeed;
                if (Crouching)
                    Y += debugSpeed;
                if (HoldingUp)
                    Y -= debugSpeed;
                var offset = new Point(0, 0); // getOffsetFromImage();
                X = ( ( sonicLevel.LevelWidth * 128 ) + ( X ) ) % ( sonicLevel.LevelWidth * 128 ) + offset.X;
                Y = ( ( sonicLevel.LevelHeight * 128 ) + ( Y ) ) % ( sonicLevel.LevelHeight * 128 ) + offset.Y;
                return;
            }

            UpdateMode();

            if (HLock > 0) {
                HLock--;
                HoldingRight = false;
                HoldingLeft = false;
            }

            if (InAir) {
                if (Angle != 0xff) {
                    Angle = ( 0xff + ( Angle + ( ( Angle > 0xff / 2 ) ? 2 : -2 ) ) ) % 0xff;
                    if (Angle >= 0xfd || Angle <= 0x01)
                        Angle = 0xff;
                }
            }

            EffectPhysics();
            CheckCollisionWithRings();
            UpdateSprite();

            sensorManager.Check(this);

            var sensorM1 = sensorManager.GetResult("m1");
            var sensorM2 = sensorManager.GetResult("m2");

            var best = GetBestSensor(sensorM1, sensorM2, Mode);
            if (best != null) {
                switch (Mode) {
                    case RotationMode.Floor:
                        X = ( best.Value +
                              ( sensorM2 != null && sensorM1 != null && ( sensorM1.Value == sensorM2.Value ) ? 12 : ( best.Letter == "m1" ? 12 : -12 ) ) );
                        Gsp = 0;
                        if (InAir) Xsp = 0;
                        break;
                    case RotationMode.LeftWall:
                        Y = ( best.Value +
                              ( sensorM2 != null && sensorM1 != null && ( sensorM1.Value == sensorM2.Value ) ? 12 : ( best.Letter == "m1" ? 12 : -12 ) ) );
                        if (InAir) Xsp = 0;

                        break;
                    case RotationMode.Ceiling:
                        X = ( best.Value +
                              ( sensorM2 != null && sensorM1 != null && ( sensorM1.Value == sensorM2.Value ) ? 12 : ( best.Letter == "m1" ? -12 : 12 ) ) );
                        Gsp = 0;
                        if (InAir) Xsp = 0;

                        break;
                    case RotationMode.RightWall:
                        Y = ( best.Value +
                              ( sensorM2 != null && sensorM1 != null && ( sensorM1.Value == sensorM2.Value ) ? 12 : ( best.Letter == "m1" ? -12 : 12 ) ) );
                        Gsp = 0;
                        if (InAir) Xsp = 0;

                        break;
                }
            }
            sensorManager.Check(this);

            var sensorA = sensorManager.GetResult("a");
            var sensorB = sensorManager.GetResult("b");
            int fy;
            int fx;

            var hSize = GetHalfImageSize();
            if (!InAir) {
                best = GetBestSensor(sensorA, sensorB, Mode);
                if (best == null) InAir = true;
                else {
                    JustHit = false;
                    switch (Mode) {
                        case RotationMode.Floor:

                            best.Chosen = true;
                            Angle = best.Angle;
                            Y = fy = best.Value - hSize.Y;

                            break;
                        case RotationMode.LeftWall:
                            best.Chosen = true;
                            Angle = best.Angle;
                            X = fx = best.Value + hSize.X;

                            break;
                        case RotationMode.Ceiling:

                            best.Chosen = true;
                            Angle = best.Angle;
                            Y = fy = best.Value + hSize.Y;

                            break;
                        case RotationMode.RightWall:

                            best.Chosen = true;
                            Angle = best.Angle;
                            X = fx = best.Value - hSize.X;

                            break;
                    }
                }

                UpdateMode();
            } else {
                if (sensorA == null && sensorB == null)
                    InAir = true;
                else {
                    if (( sensorA != null && sensorA.Value >= 0 ) && ( sensorB != null && sensorB.Value >= 0 )) {
                        if (sensorA.Value < sensorB.Value) {
                            if (Y + ( 20 ) >= sensorA.Value) {
                                Angle = sensorA.Angle;
                                Y = fy = sensorA.Value - hSize.Y;
                                Rolling = CurrentlyBall = false;
                                InAir = false;
                            }
                        } else {
                            if (sensorB.Value > -1) {
                                if (Y + ( 20 ) >= sensorB.Value) {
                                    Angle = sensorB.Angle;
                                    Y = fy = sensorB.Value - hSize.Y;
                                    Rolling = CurrentlyBall = false;
                                    InAir = false;
                                }
                            }
                        }
                    } else if (( sensorA != null ) && sensorA.Value > -1) {
                        if (Y + ( 20 ) >= sensorA.Value) {
                            Angle = sensorA.Angle;
                            Y = fy = sensorA.Value - hSize.Y;
                            Rolling = CurrentlyBall = false;
                            InAir = false;
                        }
                    } else if (sensorB != null && sensorB.Value > -1) {
                        if (Y + ( 20 ) >= sensorB.Value) {
                            Angle = sensorB.Angle;
                            Y = fy = sensorB.Value - hSize.Y;
                            Rolling = CurrentlyBall = false;
                            InAir = false;
                        }
                    }
                }
                UpdateMode();

                var cur = SonicManager.Instance.SpriteCache.SonicSprites[SpriteState + scale.X + scale.Y];
                var __h = cur.Height / scale.Y / 2;

                sensorManager.Check(this);
                var sensorC = sensorManager.GetResult("c");
                var sensorD = sensorManager.GetResult("d");

                if (( sensorC == null && sensorD == null )) {} else {
                    if (sensorD != null && ( sensorC != null ) && ( sensorC.Value >= 0 && sensorD.Value >= 0 )) {
                        if (sensorC.Value < sensorD.Value) {
                            if (Y + ( __h ) >= sensorC.Value) {
                                if (Ysp < 0) {
                                    if (sensorC.Angle > 0x40 && sensorC.Angle < 0xC0) {
                                        Angle = sensorC.Angle;

                                        Gsp = Ysp;
                                        InAir = false;
                                        WasInAir = false;
                                    } else Ysp = 0;

                                    Y = fy = sensorC.Value + __h;
                                }
                            }
                        } else {
                            if (Y + ( __h ) >= sensorD.Value) {
                                if (Ysp < 0) {
                                    if (sensorD.Angle > 0x40 && sensorD.Angle < 0xC0) {
                                        Angle = sensorD.Angle;

                                        Gsp = -Ysp;
                                        InAir = false;
                                        WasInAir = false;
                                    } else Ysp = 0;
                                    Y = fy = sensorD.Value + __h;
                                }
                            }
                        }
                    } else if (sensorC != null && sensorC.Value > -1) {
                        if (Y + ( __h ) >= sensorC.Value) {
                            if (Ysp < 0) {
                                if (sensorC.Angle > 0x40 && sensorC.Angle < 0xC0) {
                                    Angle = sensorC.Angle;
                                    Gsp = Ysp;

                                    InAir = false;
                                    WasInAir = false;
                                } else Ysp = 0;
                                Y = fy = sensorC.Value + __h;
                            }
                        }
                    } else if (sensorD != null && sensorD.Value > -1) {
                        if (Y + ( __h ) >= sensorD.Value) {
                            if (Ysp < 0) {
                                if (sensorD.Angle > 0x40 && sensorD.Angle < 0xC0) {
                                    Angle = sensorD.Angle;
                                    Gsp = -Ysp;
                                    InAir = false;
                                    WasInAir = false;
                                } else Ysp = 0;
                                Y = fy = sensorD.Value + __h;
                            }
                        }
                    }
                    UpdateMode();
                }
            }
        }

        private SensorM GetBestSensor(SensorM sensor1, SensorM sensor2, RotationMode mode)
        {
            if (sensor1 == null && sensor2 == null) return null;

            if (sensor1 == null) return sensor2;
            if (sensor2 == null) return sensor1;

            switch (mode) {
                case RotationMode.Floor:
                    return sensor1.Value < sensor2.Value ? sensor1 : sensor2;
                case RotationMode.LeftWall:
                    return sensor1.Value > sensor2.Value ? sensor1 : sensor2;
                case RotationMode.Ceiling:
                    return sensor1.Value > sensor2.Value ? sensor1 : sensor2;
                case RotationMode.RightWall:
                    return sensor1.Value < sensor2.Value ? sensor1 : sensor2;
            }
            return null;
        }

        public bool Invulnerable()
        {
            var mc = SonicManager.Instance.DrawTickCount - sonicLastHitTick;
            if (mc < 120) {
                if (mc % 8 < 4)
                    return true;
            }
            return false;
        }

        private Point GetHalfImageSize()
        {
            return new Point(20, 20);
            var scale = SonicManager.Instance.Scale;
            var cur = SonicManager.Instance.SpriteCache.SonicSprites[SpriteState + scale.X + scale.Y];
            var xSize = 0;
            var ySize = 0;
            switch (Mode) {
                case RotationMode.Floor:
                    ySize = ( cur.Height / scale.Y / 2 );
                    break;
                case RotationMode.LeftWall:
                    xSize = ( cur.Width / scale.X / 2 );

                    break;
                case RotationMode.Ceiling:
                    ySize = ( cur.Height / scale.Y / 2 );

                    break;
                case RotationMode.RightWall:

                    xSize = ( cur.Width / scale.X / 2 );
                    break;
            }

            return new Point(xSize, ySize);
        }

        private Point GetOffsetFromImage()
        {
            var scale = SonicManager.Instance.Scale;
            var cur = SonicManager.Instance.SpriteCache.SonicSprites[SpriteState + scale.X + scale.Y];
            var xOffset = 0;
            var yOffset = 0;
            if (cur.Height != 40 * scale.X) {
                int n;
                switch (Mode) {
                    case RotationMode.Floor:

                        n = 0;
                        yOffset = ( 40 - ( ( cur.Height + n ) / scale.Y ) ) / 2;
                        break;
                    case RotationMode.LeftWall:
                        n = 15;
                        xOffset = -( 40 - ( ( cur.Height + n ) / scale.X ) ) / 2;
                        break;
                    case RotationMode.Ceiling:
                        n = 8;
                        yOffset = -( 40 - ( ( cur.Height + n ) / scale.Y ) ) / 2;
                        break;
                    case RotationMode.RightWall:
                        n = 9;
                        xOffset = ( 40 - ( ( cur.Height + n ) / scale.X ) ) / 2;
                        break;
                }
            }
            return new Point(xOffset, yOffset);
        }

        private void UpdateSprite()
        {
            var absgsp = Math.Abs(Gsp);
            var word = SpriteState.Substring(0, SpriteState.Length - 1);
            var j = int.Parse(SpriteState.Substring(SpriteState.Length - 1, SpriteState.Length));
            if (Breaking > 0) {
                if (Gsp > 0 || Gsp == 0 || SpriteState == "breaking3") {
                    Facing = false;
                    Breaking = 0;
                }
            } else if (Breaking < 0) {
                if (Gsp < 0 || Gsp == 0 || SpriteState == "breaking3") {
                    Breaking = 0;
                    Facing = true;
                }
            }

            var epsilon = 0.00001;
            if (JustHit) {
                if (word != "hit") {
                    SpriteState = "hit0";
                    runningTick = 1;
                } else if (( ( runningTick++ ) % ( (int) Math.Floor(8 - absgsp) ) == 0 ))
                    SpriteState = "hit1";
            } else if (SpinDash) {
                if (word != "spindash") {
                    SpriteState = "spindash0";
                    runningTick = 1;
                } else if (( ( runningTick++ ) % (int) Math.Floor(2 - absgsp) ) == 0)
                    SpriteState = "spindash" + ( ( j + 1 ) % 6 );
            } else if (Math.Abs(absgsp - 0) < epsilon && InAir == false) {
                if (Ducking) {
                    if (word != "duck") {
                        SpriteState = "duck0";
                        runningTick = 1;
                    } else if (( ( runningTick++ ) % (int) Math.Floor(4 - absgsp) ) == 0)
                        SpriteState = "duck1";
                } else if (HoldingUp) {
                    if (word != "lookingup") {
                        SpriteState = "lookingup0";
                        runningTick = 1;
                    } else if (( ( runningTick++ ) % (int) Math.Floor(4 - absgsp) ) == 0)
                        SpriteState = "lookingup1";
                } else {
                    SpriteState = "normal";
                    CurrentlyBall = false;
                    Rolling = false;
                    runningTick = 0;
                }
            } else if (Breaking != 0) {
                if (word != "breaking") {
                    SpriteState = "breaking0";
                    runningTick = 1;
                } else if (( runningTick++ ) % ( 7 ) == 0) {
                    SpriteState = "breaking" + ( ( j + 1 ) % 4 );
                    if (j == 0)
                        HaltSmoke.Add(new Point((int) X, (int) Y));
                }
            } else if (CurrentlyBall) {
                if (word != "balls") {
                    SpriteState = "balls0";
                    runningTick = 1;
                } else if (( ( runningTick++ ) % ( (int) Math.Floor(8 - absgsp) ) == 0 ) || ( 8 - absgsp < 1 ))
                    SpriteState = "balls" + ( ( j + 1 ) % 5 );
            } else if (absgsp < 6) {
                if (word != "running") {
                    SpriteState = "running0";
                    runningTick = 1;
                } else if (( ( runningTick++ ) % ( (int) Math.Floor(8 - absgsp) ) == 0 ) || ( 8 - absgsp < 1 ))
                    SpriteState = "running" + ( ( j + 1 ) % 8 );
            } else if (absgsp >= 6) {
                if (word != "fastrunning") {
                    SpriteState = "fastrunning0";
                    runningTick = 1;
                } else if (( ( runningTick++ ) % ( (int) Math.Floor(8 - absgsp) ) == 0 ) || ( 8 - absgsp < 1 ))
                    SpriteState = "fastrunning" + ( ( j + 1 ) % 4 );
            }
        }

        private void EffectPhysics()
        {
            Watcher.Tick();

            var physics = physicsVariables;

            var max = physics.TopSpeed;
            if (!Jumping) {
                if (!InAir && WasJumping)
                    WasJumping = false;
            }
            if (InAir && !WasInAir) {
                WasInAir = true;

                var offset = GetOffsetFromImage();
                //  X += offset.X;
                //  Y += offset.Y;

                /*if ((angle >= 0x70 && angle <= 0x90)) {
                xsp = (gsp);
                }*/
            }
            if (!InAir && WasInAir) {
                WasInAir = false;
                if (( Angle >= 0xF0 || Angle <= 0x0F ))
                    Gsp = ( Xsp );
                else if (( Angle > 0xE2 && Angle <= 0xEF ) ||
                         ( Angle >= 0x10 && Angle <= 0x1F ))
                    Gsp = ( Ysp );
                else if (( Angle >= 0xC0 && Angle <= 0xE2 ))
                    Gsp = ( -Ysp );
                else if (( Angle >= 0x20 && Angle <= 0x3F ))
                    Gsp = ( Ysp );
                Xsp = 0;
                Ysp = 0;
            }

            if (!InAir && !Rolling) {
                if (!HoldingLeft && !HoldingRight && !JustHit) {
                    //friction
                    Gsp -= ( Math.Min(Math.Abs(Gsp), Watcher.Multiply(physics.Frc)) * ( Gsp > 0 ? 1 : -1 ) );
                }
                oldSign = Help.Sign(Gsp);
                //slope
                Gsp += Watcher.Multiply(physics.Slp) * -Help.Sin(Angle);
                if (oldSign != Help.Sign(Gsp) && oldSign != 0)
                    HLock = 30;

                if (HoldingRight && !HoldingLeft && !JustHit) {
                    Facing = true;
                    if (Gsp >= 0) {
                        //accelerate 
                        Gsp += Watcher.Multiply(physics.Acc);
                        if (Gsp > max) Gsp = max;
                    } else {
                        //decelerate 
                        Gsp += Watcher.Multiply(physics.Dec);
                        if (Math.Abs(Gsp) > 4.5) {
                            Facing = false;
                            Breaking = 1;
                            runningTick = 0;
                        }
                    }
                }
                if (HoldingLeft && !HoldingRight && !JustHit) {
                    Facing = false;
                    if (Gsp <= 0) {
                        //accelerate 
                        Gsp -= Watcher.Multiply(physics.Acc);
                        if (Gsp < -max) Gsp = -max;
                    } else {
                        //decelerate 
                        Gsp -= Watcher.Multiply(physics.Dec);
                        if (Math.Abs(Gsp) > 4.5) {
                            Facing = true;
                            Breaking = -1;
                            runningTick = 0;
                        }
                    }
                }
            }

            Ducking = false;
            if (Crouching) {
                if (Math.Abs(Gsp) > 1.03125) {
                    Rolling = true;
                    CurrentlyBall = true;
                } else
                    Ducking = true;
            } else {
                if (SpinDash) {
                    Gsp = ( 8 + Help.Floor(SpinDashSpeed) / 2 ) * ( Facing ? 1 : -1 );
                    SpinDash = false;
                    Rolling = true;
                    CurrentlyBall = true;
                }
            }

            if (!InAir && Rolling) {
                //dec  
                if (HoldingLeft && !JustHit) {
                    if (Gsp > 0) {
                        if (Rolling)
                            Gsp = ( Help.Max(0, Gsp - Watcher.Multiply(physics.Rdec)) );
                    }
                }
                if (HoldingRight && !JustHit) {
                    if (Gsp < 0) {
                        if (Rolling)
                            Gsp = ( Help.Min(0, Gsp + Watcher.Multiply(physics.Rdec)) );
                    }
                }
                //friction
                Gsp -= ( Math.Min(Math.Abs(Gsp), Watcher.Multiply(physics.Rfrc)) * ( Gsp > 0 ? 1 : -1 ) );
                oldSign = Help.Sign(Gsp);
                //slope
                var ang = Help.Sin(Angle);
                if (( ang > 0 ) == ( Gsp > 0 ))
                    Gsp += Watcher.Multiply(-physics.SlpRollingUp) * ang;
                else
                    Gsp += Watcher.Multiply(-physics.SlpRollingDown) * ang;

                if (Gsp > max * 2.5) Gsp = max * 2.5f;
                if (Gsp < -max * 2.5) Gsp = -max * 2.5f;

                if (oldSign != Help.Sign(Gsp) && oldSign != 0)
                    HLock = 30;
                if (Math.Abs(Gsp) < 0.53125) {
                    Rolling = false;
                    CurrentlyBall = false;
                }
            }

            CheckCollisionWithRings();

            if (InAir) {
                if (HoldingRight && !HoldingLeft && !JustHit) {
                    Facing = true;

                    if (Xsp >= 0) {
                        //accelerate 
                        Xsp += Watcher.Multiply(physics.Air);
                        if (Xsp > max) Xsp = max;
                    } else {
                        //decelerate 
                        Xsp += Watcher.Multiply(physics.Air);
                    }
                }
                if (HoldingLeft && !HoldingRight && !JustHit) {
                    Facing = false;
                    if (Xsp <= 0) {
                        //accelerate 
                        Xsp -= Watcher.Multiply(physics.Air);
                        if (Xsp < -max) Xsp = -max;
                    } else {
                        //decelerate 
                        Xsp -= Watcher.Multiply(physics.Air);
                    }
                }
                if (WasInAir)
                    if (Jumping) {} else {}
                //gravity
                Ysp += JustHit ? 0.1875 : physics.Grv;
                //drag
                if (Ysp < 0 && Ysp > -4) {
                    if (Math.Abs(Xsp) > 0.125)
                        Xsp *= 0.96875f;
                }
                if (Ysp > 16) Ysp = 16;
            }
            if (WasInAir && Jumping) {} else if (Jumping && !WasJumping) {
                WasJumping = true;
                if (Ducking) {
                    SpinDash = true;
                    SpinDashSpeed += 2;
                    if (SpinDashSpeed > 8)
                        SpinDashSpeed = 8;

                    SpriteState = "spindash0";
                } else {
                    InAir = true;
                    CurrentlyBall = true;
                    Xsp = physics.Jmp * Help.Sin(Angle) + Gsp * Help.Cos(Angle);
                    Ysp = physics.Jmp * Help.Cos(Angle);

                    if (Math.Abs(Xsp) < .17)
                        Xsp = 0;
                }
            }

            if (!InAir) {
                if (SpinDash)
                    Gsp = 0;
                Xsp = Gsp * Help.Cos(Angle);
                Ysp = Gsp * -Help.Sin(Angle);

                if (Math.Abs(Gsp) < 2.5 && Mode != RotationMode.Floor) {
                    if (Mode == RotationMode.RightWall) X += 0;
                    else if (Mode == RotationMode.LeftWall) X += 0;
                    else if (Mode == RotationMode.Ceiling) Y += 0;
                    var oldMode = Mode;
                    UpdateMode();
                    //Gsp = 0;NO
                    Mode = RotationMode.Floor;
                    HLock = 30;
                    InAir = true;
                }
            }

            if (Xsp > 0 && Xsp < 0.008) {
                Gsp = 0;
                Xsp = 0;
            }
            if (Xsp < 0 && Xsp > -0.008) {
                Gsp = 0;
                Xsp = 0;
            }

            X = ( ( sonicLevel.LevelWidth * 128 ) + ( X + Xsp ) ) % ( sonicLevel.LevelWidth * 128 );
            Y = ( ( sonicLevel.LevelHeight * 128 ) + ( Y + Ysp ) ) % ( sonicLevel.LevelHeight * 128 );
        }

        public void Draw(CanvasContext2D canvas, Point scale)
        {
            var fx = ( X );
            var fy = ( Y );

            if (Invulnerable()) return;
            var cur = SonicManager.Instance.SpriteCache.SonicSprites[SpriteState + scale.X + scale.Y];
            if (cur == null) {}

            if (cur.Loaded()) {
                canvas.Save();
                var offset = GetOffsetFromImage();
                canvas.Translate(( fx - SonicManager.Instance.WindowLocation.X + offset.X ) * scale.X,
                                 ( ( fy - SonicManager.Instance.WindowLocation.Y + offset.Y ) * scale.Y ));
                if (SonicManager.Instance.ShowHeightMap) {
                    canvas.Save();
                    var mul = 6;
                    var xj = Xsp * scale.X * mul;
                    var yj = Ysp * scale.Y * mul;
                    canvas.BeginPath();
                    canvas.MoveTo(0, 0);
                    canvas.LineTo(xj, yj);
                    canvas.FillStyle = "rgba(163,241,255,0.8)";
                    canvas.Arc(xj, yj, 5, 0, 2 * Math.PI, true);
                    canvas.ClosePath();

                    canvas.LineWidth = 6;
                    canvas.StrokeStyle = "white"; //6C6CFC
                    canvas.Stroke();
                    canvas.LineWidth = 3;
                    canvas.StrokeStyle = "#2448D8"; //6C6CFC
                    canvas.Fill();
                    canvas.Stroke();
                    canvas.Restore();
                }

                if (!Facing) {
                    //canvas.translate(cur.width, 0);
                    canvas.Scale(-1, 1);
                    if (!CurrentlyBall && !SpinDash)
                        canvas.Rotate(-Help.FixAngle(Angle));

                    canvas.DrawImage(cur, -cur.Width / 2, -cur.Height / 2);

                    if (SpinDash) {
                        canvas.DrawImage(
                                SonicManager.Instance.SpriteCache.SonicSprites[
                                        ( "spinsmoke" + ( SonicManager.Instance.DrawTickCount % 14 ) / 2 ) + scale.X + scale.Y],
                                ( -cur.Width / 2 ) - 25 * scale.X,
                                -cur.Height / 2 + ( offset.Y * scale.Y ) - 14,
                                cur.Width,
                                cur.Height);
                    }
                } else {
                    if (!CurrentlyBall && !SpinDash)
                        canvas.Rotate(Help.FixAngle(Angle));
                    canvas.DrawImage(cur, -cur.Width / 2, -cur.Height / 2);

                    if (SpinDash) {
                        canvas.DrawImage(
                                SonicManager.Instance.SpriteCache.SonicSprites[
                                        ( "spinsmoke" + ( SonicManager.Instance.DrawTickCount % 14 ) / 2 ) + scale.X + scale.Y],
                                ( -cur.Width / 2 ) - 25 * scale.X,
                                -cur.Height / 2 + ( offset.Y * scale.Y ) - 14,
                                cur.Width,
                                cur.Height);
                    }
                }

                /*
               canvas.moveTo(-10 * scale.x, 4 * scale.y);
               canvas.lineTo(10 * scale.x, 4 * scale.y);
               canvas.lineWidth = 3;
               canvas.strokeStyle = "#FFF";
               canvas.stroke();

               canvas.moveTo(-9 * scale.x, 0 * scale.y);
               canvas.lineTo(-9 * scale.x, 20 * scale.y);
               canvas.lineWidth = 3;
               canvas.strokeStyle = "#FFF";
               canvas.stroke();

               canvas.moveTo(9 * scale.x, 0 * scale.y);
               canvas.lineTo(9 * scale.x, 20 * scale.y);
               canvas.lineWidth = 3;
               canvas.strokeStyle = "#FFF";
               canvas.stroke();*/

                /*
                canvas.strokeStyle = "#FFF";
                canvas.lineWidth = 4;
                canvas.strokeRect(-cur.width / 2, -cur.height / 2, cur.width, cur.height);
                */
                canvas.Restore();
                if (SonicManager.Instance.ShowHeightMap)
                    sensorManager.Draw(canvas, scale, this);
                for (var i = 0; i < HaltSmoke.Count; i++) {
                    var lo = HaltSmoke[i];
                    canvas.DrawImage(
                            SonicManager.Instance.SpriteCache.SonicSprites[
                                    ( "haltsmoke" + ( SonicManager.Instance.DrawTickCount % ( 4 * 6 ) ) / 6 ) + scale.X + scale.Y],
                            ( ( lo.X - SonicManager.Instance.WindowLocation.X - 25 ) * scale.X ),
                            ( ( lo.Y + 12 - SonicManager.Instance.WindowLocation.Y + offset.Y ) * scale.Y ));
                    if (( ( SonicManager.Instance.DrawTickCount + 6 ) % ( 4 * 6 ) ) / 6 == 0)
                        HaltSmoke = HaltSmoke.Extract(i, 1);
                }
            }
        }

        public void DrawUI(CanvasContext2D canvas, Point pos, Point scale)
        {
            using (new CanvasHandler(canvas)) {
                if (canvas.Font != "13pt Arial bold")
                    canvas.Font = "13pt Arial bold";
                canvas.FillStyle = "White";
                canvas.FillText("Rings: " + Rings, pos.X + 90, pos.Y + 45);
                canvas.FillText("Angle: " + Angle.ToString(16), pos.X + 90, pos.Y + 75);
                canvas.FillText("Position: " + ( X ) + ", " + ( Y ), pos.X + 90, pos.Y + 105);
                canvas.FillText("Speed: g: " + Gsp.ToFixed(3) + " x:" + Xsp.ToFixed(3) + " y:" + Ysp.ToFixed(3), pos.X + 90, pos.Y + 135);
                canvas.FillText("Mode: " + Mode.ToString(), pos.X + 90, pos.Y + 165);
                canvas.FillText("Multiplier: " + Watcher.mult, pos.X + 90, pos.Y + 195);
                canvas.FillText("RealScale: " + SonicManager.Instance.RealScale.String(), pos.X + 90, pos.Y + 225);
                if (InAir)
                    canvas.FillText("Air ", pos.X + 220, pos.Y + 45);
                if (HLock > 0)
                    canvas.FillText("HLock: " + HLock, pos.X + 90, pos.Y + 195);
            }
        }

        public void Hit(double x, double y)
        {
            if (SonicManager.Instance.DrawTickCount - sonicLastHitTick < 120)
                return;
            JustHit = true;
            Ysp = -4;
            Xsp = 2 * ( ( X - x ) < 0 ? -1 : 1 );
            sonicLastHitTick = SonicManager.Instance.DrawTickCount;
            var t = 0;
            var angle = 101.25;
            var n = false;
            var speed = 4;
            while (t < Rings) {
                var ring = new Ring(true);
                SonicManager.Instance.ActiveRings.Add(ring);
                ring.X = (int) X;
                ring.Y = (int) Y - 10;
                ring.Ysp = -Math.Sin(angle) * speed;
                ring.Xsp = Math.Cos(angle) * speed;

                if (n) {
                    ring.Ysp *= -1;
                    angle += 22.5;
                }
                n = !n;
                t++;
                if (t == 16) {
                    speed = 2;
                    angle = 101.25;
                }
            }
            Rings = 0;
        }

        public void Debug()
        {
            Debugging = !Debugging;
            Xsp = 0;
            Gsp = 0;
            Ysp = 0;
            SpriteState = "normal";
        }

        public void PressUp()
        {
            HoldingUp = true;
        }

        public void ReleaseUp()
        {
            HoldingUp = false;
        }

        public void PressCrouch()
        {
            Crouching = true;
        }

        public void ReleaseCrouch()
        {
            Crouching = false;
        }

        public void PressLeft()
        {
            HoldingLeft = true;
        }

        public void ReleaseLeft()
        {
            HoldingLeft = false;
        }

        public void PressRight()
        {
            HoldingRight = true;
        }

        public void ReleaseRight()
        {
            HoldingRight = false;
        }

        public void PressJump()
        {
            Jumping = true;
        }

        public void ReleaseJump()
        {
            Jumping = false;
        }

        public bool CheckCollisionWithObjects(int x, int y, string letter)
        {
            var me = new Point(x, y);
            var levelObjectInfos = SonicManager.Instance.InFocusObjects;

            for (int index = 0; index < levelObjectInfos.Count; index++) {
                var ob = levelObjectInfos[index];
                var dj = ob.Collides(me);
                var dj2 = ob.HurtsSonic(me);

                if (dj.Truthy())
                    return ob.Collide(this, letter, dj);
                if (dj2.Truthy())
                    return ob.HurtSonic(this, letter, dj2);
            }
            return false;
        }

        public void CheckCollisionWithRings()
        {
            var me = myRec;
            var rectangle = new Rectangle(0, 0, 8 * 2, 8 * 2);
            List<Ring> rings = SonicManager.Instance.SonicLevel.Rings;

            for (int index = 0; index < rings.Count; index++) {
                var ring = rings[index];
                var pos = ring;
                if (obtainedRing[index]) continue;
                rectangle.X = pos.X - 8;
                rectangle.Y = pos.Y - 8;
                if (IntersectingRectangle.IntersectRect(me, rectangle)) {
                    Rings++;
                    obtainedRing[index] = true;
                }
            }
        }

        public SensorM CheckCollisionLine(int p0, int p1, int p2, int p3)
        {
            return null;
        }
    }
    public class Watcher
    {
        private long lastTick = 0;
        public double mult = 1;

        public void Tick()
        {
            if (true || SonicManager.Instance.InHaltMode) {
                mult = 1;
                return;
            }
            var ticks = new JsDate().GetTime();
            long offset = 0;
            if (lastTick == 0)
                offset = 16;
            else
                offset = ticks - lastTick;

            lastTick = ticks;

            mult = offset / 16d;
        }

        public double Multiply(double v)
        {
            return mult * v;
        }
    }
}