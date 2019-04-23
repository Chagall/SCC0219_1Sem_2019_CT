from HTMLParser import HTMLParser
import sys

# Alunos
# Fabio Alves Martins Pereira 7987435
# João Renato Zanetti de Lima 8656243

# Parser do arquivo HTML que sera lido
class MyHTMLParser(HTMLParser):
    def handle_starttag(self, tag, attrs):
        print "Tag de inicio:", tag
        for attr in attrs:
            print "     atributo:", attr

    def handle_endtag(self, tag):
        print "Tag fim  :", tag

    def handle_data(self, data):
		if(not data.isspace()):
			print "Dado     :", data

    def handle_comment(self, data):
        print "Comentario  :", data

    def handle_entityref(self, name):
        c = unichr(name2codepoint[name])
        print "Named ent:", c

    def handle_charref(self, name):
        if name.startswith('x'):
            c = unichr(int(name[1:], 16))
        else:
            c = unichr(int(name))
        print "Num ent  :", c

    def handle_decl(self, data):
        print "Declaracao     :", data


# Leitura do nome do arquivo passad como argumento na linha de comando
htmlFile = sys.argv[1:]

# Leitura e print das tags documento
for filename in htmlFile:
    with open(filename, 'r') as file:
    	data = file.read()
	# Aqui o parser e criado, ele faz a leitura do arquivo html
	# e imprime na tela as tags, atributos e dados
	parser = MyHTMLParser()
	parser.feed(data)


