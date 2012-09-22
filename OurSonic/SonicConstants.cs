namespace OurSonic
{
    public class SonicConstants
    {
        public float Acc;
        public float Air;
        public float Dec;
        public float Frc;
        public float Grv;
        public float Jmp;
        public float Rdec;
        public float Rfrc;
        public float SlpRollingDown;
        public float SlpRollingUp;
        public float TopSpeed;

        public static SonicConstants Sonic()
        {
            var sc = new SonicConstants {
                                                Acc = 0.046875f,
                                                Dec = 0.5f,
                                                Frc = 0.46875f,
                                                Rdec = 0.125f,
                                                Rfrc = 0.0234375f,
                                                SlpRollingUp = 0.078125f,
                                                SlpRollingDown = 0.3125f,
                                                Jmp = -6.5f,
                                                Grv = 0.21875f,
                                                Air = 0.09375f,
                                                TopSpeed = 6
                                        };

            return sc;
        }
    }
}