import gensim, logging
from gensim.test.utils import datapath
from gensim.models import KeyedVectors
import numpy as np
from pyparsing import tokenMap
import matplotlib.pyplot as plt
import matplotlib.cm as cm
from sklearn.manifold import TSNE
from matplotlib.colors import Normalize
import pandas as pd
import time
import seaborn as sns

model = KeyedVectors.load_word2vec_format('vectors.txt', binary=False)

# most_similar is defaulted to cosine similarity
life_sim = model.most_similar(positive=["life"], topn= 20)
market_sim = model.most_similar(positive=["market"], topn= 20)
stanford_sim = model.most_similar(positive=["stanford"], topn= 20)

# Helper function to display similar words
def display_sim(arr, word):
    print("Most similar words for " + word)
    for i in range(20):
        print(f"{i}. {arr[i]}")
    print()

# Display Results
display_sim(life_sim, "life")
display_sim(market_sim, "market")
display_sim(stanford_sim, "stanford")

#===================   Part 2   ========================#

# Define function to gather cluster of words
def gather_cluster(word, model):
    sim_words = [word]
    cluster = [model[word]]
    neighbors = model.most_similar(positive=[word], topn=20)
    for neighbor in neighbors:
        sim_words.append(neighbor[0])
        cluster.append(model[neighbor[0]])
    return sim_words, [cluster]

# Plots 20 most similar words to given word
def tsne_plot_similar_words(title, label, embedding_cluster, word_cluster, a, filename=None):
    plt.figure(figsize=(16, 9))
    x = embedding_cluster[:, :, 0][0]
    y = embedding_cluster[:, :, 1][0]
    color = Normalize(min(y), max(y))
    plt.scatter(x, y, c=y, norm=color, alpha=a, label=label)
    for i, word in enumerate(word_cluster):
        plt.annotate(word, alpha=0.5, xy=(x[i], y[i]), xytext=(5, 2),
                        textcoords='offset points', ha='right', va='bottom', size=8)
    plt.title(title)
    plt.grid(True)
    if filename:
        plt.savefig(filename, format='png', dpi=150, bbox_inches='tight')
    plt.show()


# Plot for "life"
words, embeddings = gather_cluster("life", model)
embeddings = np.array(embeddings)
n, m, k = embeddings.shape

tsne_model_en_2d = TSNE(perplexity=15, n_components=2, init='pca', n_iter=3500, random_state=32)
embeddings_en_2d = np.array(tsne_model_en_2d.fit_transform(embeddings.reshape(n * m, k))).reshape(n, m, 2)

tsne_plot_similar_words('Similar words to **life**', "life", embeddings_en_2d, words, 0.7,
                        'similar_words_life.png')

# Plot for "market"
words, embeddings = gather_cluster("market", model)
embeddings = np.array(embeddings)
n, m, k = embeddings.shape


tsne_model_en_2d = TSNE(perplexity=15, n_components=2, init='pca', n_iter=3500, random_state=32)
embeddings_en_2d = np.array(tsne_model_en_2d.fit_transform(embeddings.reshape(n * m, k))).reshape(n, m, 2)

tsne_plot_similar_words('Similar words to **market**', "market", embeddings_en_2d, words, 0.7,
                        'similar_words_market.png')


# Plot for "stanford"
words, embeddings = gather_cluster("stanford", model)
embeddings = np.array(embeddings)
n, m, k = embeddings.shape

tsne_model_en_2d = TSNE(perplexity=15, n_components=2, init='pca', n_iter=3500, random_state=32)
embeddings_en_2d = np.array(tsne_model_en_2d.fit_transform(embeddings.reshape(n * m, k))).reshape(n, m, 2)

tsne_plot_similar_words('Similar words to **stanford**', "stanford", embeddings_en_2d, words, 0.7,
                        'similar_words_stanford.png')

# Gather all words into np.array
words_wp = []
embeddings_wp = []

for word in list(model.vocab.keys()):
    embeddings_wp.append(model[word])
    words_wp.append(word)

embeddings_wp = np.array(embeddings_wp)
words_wp = np.array(words_wp)

# Convert dataset to dataframe
feat_cols = ['pixel' + str(i) for i in range(embeddings_wp.shape[1])]

df = pd.DataFrame(embeddings_wp, columns=feat_cols)
df['y'] = words_wp
df['label'] = df['y']

rndperm = np.random.permutation(df.shape[0])

# Take a subset of the dataframe to be plot
N = 100000
df_subset = df.loc[rndperm[:N],:].copy()
model_subset = df_subset[feat_cols].values

# Run TSNE timing each iteration
time_start = time.time()
tsne = TSNE(n_components=2, verbose=1, perplexity=40,n_iter=500)
tsne_results = tsne.fit_transform(model_subset)
print('t-SNE done! Time elapsed: {} seconds'.format(time.time()-time_start))

# Plot results
plt.figure(figsize=(16,10))
sns.scatterplot(
    x=tsne_results[:,0], y=tsne_results[:,1],
    data=df_subset,
    legend="full",
    alpha=0.1
)
