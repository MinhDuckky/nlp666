import torch

class Seer:
    def __init__(self, dataset = "roberta.base"):
        roberta = torch.hub.load("pytorch/fairseq", dataset)
        roberta.eval()
        self.model = roberta
        self.tail = ["?", "!", "»"]
        self.deadtail = [".", ":", "...", "…", ",", ";"]
        self.end = ["?", "!", "!)", '?"', "»", "?]", "[", "(", "?'", "???", "(?", "('"]
        self.deadend = [".", ":", "...", "…", ",", ";", "...?", "]", ")", "'?", "?)", "')"]

    def predict(self, text, i=0, sentence=""):
        predictions = self.model.fill_mask(text + " <mask>", topk=5)
        unmasked = predictions[i][2].strip()
        if len(sentence.split(" ")) < 4:
            if unmasked not in self.tail and unmasked not in self.deadtail:
                sentence += " " + unmasked
                text += " " + unmasked
                return(self.predict(text, 0, sentence))
        if len(sentence.split(" ")) == 1:
            return unmasked
        if unmasked in self.tail:
            return sentence.strip() + " " + unmasked
        if unmasked in self.deadtail:
            return sentence.strip() + unmasked

    def predict_further(self, text, i=0, sentence=""):
        length = len(sentence.split(" "))
        predictions = self.model.fill_mask(text + "<mask>", topk=10)
        unmasked = predictions[i][2].strip()
        if length < 4:
            if unmasked in self.end or unmasked in self.deadend:
                return self.predict_further(text, i + 1, sentence)
            sentence += " " + unmasked
            text += " " + unmasked
            return(self.predict_further(text, 0, sentence))
        if unmasked in self.end:
            return sentence.strip() + " " + unmasked
        if unmasked in self.deadend:
            return sentence.strip() + unmasked
        return sentence.strip() + " " + unmasked

    def predict_2(self, data):
        predict = []
        for i in range(5):
            text = data["text"].strip()
            result = self.predict(text, i)
            if result not in predict and result is not None:
                predict.append(result)
        return predict

    def predict_4(self, data):
        predict = []
        for i in range(5):
            text = data["text"].strip()
            try:
                result = self.predict_further(text, i)
                if result not in predict and result is not None:
                    predict.append(result)
            except:
                continue
        return predict