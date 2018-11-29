# 算法题
需求描述：

假如要做一个字典应用，希望用户在输入字母的时候，自动给出前缀匹配的词。例如：

当用户输入：
sma

给出建议单词：
sma
smaak
smack
smaik
small
smalm
smalt
smarm
smart
……

要求一：
给出的单词按匹配度排序，所谓匹配度简单说就是，短的排前面长的排后面，如上例所示。

要求二：
给出的建议单词个数 N 可配置，当字典中的单词数小于 N 时，有多少返回多少。大于 N 时则返回 N 个。

字典在此：
https://raw.githubusercontent.com/words/an-array-of-english-words/master/words.json
