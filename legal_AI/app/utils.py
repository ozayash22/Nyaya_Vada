import re
import numpy as np
import nltk
from nltk.tokenize import word_tokenize

nltk.download("punkt")

def normalize(arr):
    return (arr - np.min(arr)) / (np.ptp(arr) + 1e-6)

def extract_references(top_indices, section_texts):
    references = []
    for i in top_indices[:3]:
        match = re.match(r"(.+?)::Section\s+(\d+[A-Z]*)", section_texts[i])
        if match:
            source_str, sec_num_str = match.groups()
            references.append(f"{source_str.strip()} - Section {sec_num_str}")
    return references