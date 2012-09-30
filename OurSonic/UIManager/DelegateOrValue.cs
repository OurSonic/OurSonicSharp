using System;
namespace OurSonic.UIManager
{
    public class DelegateOrValue<T>
    {
        public bool isValue;
        private Func<T> method;
        private T value;

        private DelegateOrValue(T d)
        {
            value = d;
            isValue = true;
        }

        private DelegateOrValue(Func<T> d)
        {
            method = d;
            isValue = false;
        }

        private T evaluate()
        {
            if (isValue == true) return value;
            else if (isValue == false) return method();
            return default( T );
        }

        public static implicit operator DelegateOrValue<T>(T d)
        {
            return new DelegateOrValue<T>(d);
        }

        public static implicit operator DelegateOrValue<T>(Func<T> d)
        {
            return new DelegateOrValue<T>(d);
        }

        public static implicit operator T(DelegateOrValue<T> d)
        {
            return d.evaluate();
        }
    }
}