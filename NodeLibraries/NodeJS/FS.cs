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
    }
}