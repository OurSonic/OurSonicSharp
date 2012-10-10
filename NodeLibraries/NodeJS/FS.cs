using System;
using System.Runtime.CompilerServices;
namespace NodeJSLibrary
{
    [IgnoreNamespace]
    [Imported(IsRealType = true)]
    public class FS : NodeModule
    {
        public void ReadFile(string s, string encoding, Action<FileSystemError, string> done) {}
        public void Rename(string oldPath, string newPath, Action<FileSystemError, string> done) {}
        public void Truncate(string fd, int len, Action<FileSystemError, string> done) {}
        public void Mkdir(string path, string mode, Action<FileSystemError, string> done) {}
        public void Readdir(string path, Action<FileSystemError, string[]> done) {}
        public void Close(string fd, Action<FileSystemError, string> done) {}
        public void Open(string path, string flags, string mode, Action<FileSystemError, string> done) {}
        public void Write(string fd, string buffer, int offset, int length, int position, Action<FileSystemError, string> done) {}
        public void Read(string fd, string buffer, int offset, int length, int position, Action<FileSystemError, string> done) {}
        public void WriteFile(string filename, string data, string encoding, Action<FileSystemError, string> done) {}
        public void WriteFile(string filename, string data, Action<FileSystemError, string> done) {}
        public void AppendFile(string filename, string data, string encoding, Action<FileSystemError, string> done) {}
        public void Exists(string path, Action<FileSystemError, bool> done) {}
        public void Unlink(string filename) {}

        public string ReadFileSync(string s, string encoding)
        {
            return default( string );
        }

        public string RenameSync(string oldPath, string newPath)
        {
            return default( string );
        }

        public string TruncateSync(string fd, int len)
        {
            return default( string );
        }

        public string MkdirSync(string path, string mode)
        {
            return default( string );
        }

        public string[] ReaddirSync(string path)
        {
            return default( string[] );
        }

        public string CloseSync(string fd)
        {
            return default( string );
        }

        public string OpenSync(string path, string flags, string mode)
        {
            return default( string );
        }

        public string WriteSync(string fd, string buffer, int offset, int length, int position)
        {
            return default( string );
        }

        public string ReadSync(string fd, string buffer, int offset, int length, int position)
        {
            return default( string );
        }

        public string WriteFileSync(string filename, string data, string encoding)
        {
            return default( string );
        }

        public string WriteFileSync(string filename, string data)
        {
            return default( string );
        }

        public string AppendFileSync(string filename, string data, string encoding)
        {
            return default( string );
            ;
        }

        public bool ExistsSync(string path)
        {
            return default( bool );
        }
    }
}