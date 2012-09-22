namespace OurSonic
{
    public class SonicConstants
    {
        public double Acc;
        public double Air;
        public double Dec;
        public double Frc;
        public double Grv;
        public double Jmp;
        public double Rdec;
        public double Rfrc;
        public double Slp;
        public double SlpRollingDown;
        public double SlpRollingUp;
        public double TopSpeed;

        public static SonicConstants Sonic()
        {
            var sc = new SonicConstants {
                                                Acc = 0.046875f,
                                                Dec = 0.5f,
                                                Slp = 0.125f,
                                                Frc = 0.046875f,
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