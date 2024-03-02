from PIL import Image
import numpy as np
import os
import matplotlib.pyplot as plt

BASE_PATH = "tedd/teddy"

LEFT_IMG = os.path.join(BASE_PATH, "teddyL.pgm")
RIGHT_IMG = os.path.join(BASE_PATH, "teddyR.pgm")
TRUE_IMG = os.path.join(BASE_PATH, "disp2.pgm")

# QUESTIONS:
# 1. Are the imaged rectified?
# 2. Understanding disparity map calculation...?

class Stero_Matching:
    def __init__(self, left_path, right_path, true_img_path):
        # Read in imgs & convert to numpy arrays
        self.left_img = np.array(Image.open(left_path))
        self.right_img = np.array(Image.open(right_path))
        self.true_img = np.array(Image.open(true_img_path))

    # Assume already rectified
    def compute_img_rectification(self):
        return "TODO"
    
    def apply_rank_transform(self, d):
        '''
        Applies rank transform to each image
        Returns: list[], list[]
            Both images with rank transform applied
        '''
        
        temp_left = np.zeros(self.left_img.shape)
        temp_right = np.zeros(self.right_img.shape)
        
        temp_imgs = [temp_left, temp_right]

        rank = lambda i, j, img, d: np.sum(img[i-d//2:i+d//2+1, j-d//2:j+d//2+1] < img[i, j]) 
        
        for k, img in enumerate([self.left_img, self.right_img]):
            rows, cols = img.shape
        
            for i in range(d//2, rows-d//2):
                for j in range(d//2, cols-d//2):
                    temp_imgs[k][i][j] = rank(i, j, img, d)

        self.left_img = temp_imgs[0]
        self.right_img = temp_imgs[1] 

        return temp_imgs[0], temp_imgs[1]
    
    def compute_disparity_map(self, d, disparity_range):
        temp_disp = np.zeros(self.left_img.shape)
        rows, cols = temp_disp.shape
        
        for i in range(d//2, rows-d//2):
            for j in range(d//2, cols-d//2):
                best_disp = 0 
                min_dif = float('inf')

                cur_lwin = self.left_img[i-d//2:i+d//2+1, j-d//2:j+d//2+1]
                # print(cur_lwin.shape)

                for offset in range(disparity_range):
                    # If offset is out of bounds or same pixel, skip
                    if (j - offset) + d//2 > cols - 1 or (j - offset) - d//2 < 0:
                        continue
                        
                    compute_abs_sum = lambda i, j, d, offset, left_img: np.sum(np.abs(left_img - self.right_img[i-d//2:i+d//2+1, (j-offset)-d//2:(j-offset)+d//2+1]))
                    rank_dif = compute_abs_sum(i, j, d, offset, cur_lwin)

                    if(rank_dif < min_dif):
                        best_disp = offset
                        min_dif = rank_dif
    
                temp_disp[i][j] = best_disp
                # print(best_disp)

        return temp_disp

    def calculate_accuracy(self, disparity_map):
        # Get a copy of the "true image"
        norm_true_img = self.true_img // 4
        disparity_map = disparity_map

        # plt.figure(figsize=(10,10))
        # plt.imshow(self.true_img, cmap='gray')
        # plt.show()

        return 1 - (np.sum(norm_true_img - disparity_map > 1) / norm_true_img.size)

    def __call__(self, d):
        test1, test2 = self.apply_rank_transform(5)
        # plt.figure(figsize=(10,10))
        # plt.imshow(test1, cmap='gray')
        # plt.show()

        # plt.figure(figsize=(10,10))
        # plt.imshow(test2, cmap='gray', alpha=0.5)
        # plt.show()

        disp1 = self.compute_disparity_map(15, 45)
        disp2 = self.compute_disparity_map(15, 58)
        
        # plt.figure(figsize=(10,10))
        # plt.imshow(disp1, cmap='gray')
        # plt.show()
        
        disp3 = self.compute_disparity_map(3, 45)
        
        print(self.calculate_accuracy(disparity_map=disp1))
        print(self.calculate_accuracy(disparity_map=disp2))
        print(self.calculate_accuracy(disparity_map=disp3))

        return True
    

if __name__ == "__main__" :
    test = Stero_Matching(LEFT_IMG, RIGHT_IMG, TRUE_IMG)
    result = test(5)
    
    print('sup bitch')
