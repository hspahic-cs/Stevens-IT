import numpy as np
import pickle
import time
import sys
import cv2
from scipy.signal import medfilt
from scipy.ndimage.filters import maximum_filter as maxfilt

def PointCloud2Image(M,Sets3DRGB,viewport,filter_size):

    # setting yp output image
    print("...Initializing 2D image...")
    top = viewport[0]
    left = viewport[1]
    h = viewport[2]
    w = viewport[3]
    bot = top  + h + 1
    right = left + w +1;
    output_image = np.zeros((h+1,w+1,3));    

    for counter in range(len(Sets3DRGB)):
        print("...Projecting point cloud into image plane...")

        # clear drawing area of current layer
        canvas = np.zeros((bot,right,3))

        # segregate 3D points from color
        dataset = Sets3DRGB[counter]
        P3D = dataset[:3,:]
        color = (dataset[3:6,:]).T
        
        # form homogeneous 3D points (4xN)
        len_P = len(P3D[1])
        ones = np.ones((1,len_P))
        X = np.concatenate((P3D, ones))

        # apply (3x4) projection matrix
        x = np.matmul(M,X)

        # normalize by 3rd homogeneous coordinate
        x = np.around(np.divide(x, np.array([x[2,:],x[2,:],x[2,:]])))

        # truncate image coordinates
        x[:2,:] = np.floor(x[:2,:])

        # determine indices to image points within crop area
        i1 = x[1,:] > top
        i2 = x[0,:] > left
        i3 = x[1,:] < bot
        i4 = x[0,:] < right
        ix = np.logical_and(i1, np.logical_and(i2, np.logical_and(i3, i4)))

        # make reduced copies of image points and cooresponding color
        rx = x[:,ix]
        rcolor = color[ix,:]

        for i in range(len(rx[0])):
            canvas[int(rx[1,i]),int(rx[0,i]),:] = rcolor[i,:]

        # crop canvas to desired output size
        cropped_canvas = canvas[top:top+h+1,left:left+w+1]

        # filter individual color channels
        shape = cropped_canvas.shape
        filtered_cropped_canvas = np.zeros(shape)
        print("...Running 2D filters...")
        for i in range(3):
            # max filter
            filtered_cropped_canvas[:,:,i] = maxfilt(cropped_canvas[:,:,i],5)

        
        # get indices of pixel drawn in the current canvas
        drawn_pixels = np.sum(filtered_cropped_canvas,2)
        idx = drawn_pixels != 0
        shape = idx.shape
        shape = (shape[0],shape[1],3)
        idxx = np.zeros(shape,dtype=bool)

        # make a 3-channel copy of the indices
        idxx[:,:,0] = idx
        idxx[:,:,1] = idx
        idxx[:,:,2] = idx

        # erase canvas drawn pixels from the output image
        output_image[idxx] = 0

        #sum current canvas on top of output image
        output_image = output_image + filtered_cropped_canvas

    print("Done")
    return output_image



# Sample use of PointCloud2Image(...)
# The following variables are contained in the provided data file:
#       BackgroundPointCloudRGB,ForegroundPointCloudRGB,K,crop_region,filter_size
# None of these variables needs to be modified

# load variables: BackgroundPointCloudRGB,ForegroundPointCloudRGB,K,crop_region,filter_size)
def SampleCameraPath():
    # load object file to retrieve data
    file_p = open("data.obj",'rb')
    camera_objs = pickle.load(file_p)

    # extract objects from object array
    crop_region = camera_objs[0].flatten()
    filter_size = camera_objs[1].flatten()
    K = camera_objs[2]
    ForegroundPointCloudRGB = camera_objs[3]
    BackgroundPointCloudRGB = camera_objs[4]

    # create variables for computation
    data3DC = (BackgroundPointCloudRGB,ForegroundPointCloudRGB)
    
    '''
    CHANGES START HERE
    ==================
          _____
          |   |
          |   |
          |   |
          |   |
       ===========
       \         /
        \       /
         \     /
          \   /
           \ / 
    '''

    # CONSTANTS
    # Rotate around origin with angle pi / 24 --> 24 images
    theta = np.pi / 24
    cur_angle = theta
    radius = 4

    # Function for getting rotation R given theta
    calc_R = lambda theta: np.array([[np.cos(theta), 0, np.sin(theta)],
                 [0, 1, 0],
                 [-np.sin(theta), 0, np.cos(theta)]])

    

    # Function for calcualating polar cordinate change in x, z dir
    calc_move = lambda theta: np.array([-radius * np.sin(theta), 0, radius * (1 - np.cos(theta))]).reshape((3,1))

    # Re-estimate target offset, found using gimp
    x_offset = 2274 - K[0][2] 
    y_offset = 1374 - K[1][2]

    # Focal lengths scaled by 1.6 to adjust to required size
    K[0][0] *= 1.6
    K[1][1] *= 1.6

    # Adjust principal points to match new center
    K[0][2] = K[0][2] * 1.6 - x_offset
    K[1][2] = K[1][2] * 1.6 - y_offset


    for step in range(25):
        tic = time.time()
        
        fname = "SampleOutput{}.jpg".format(step)
        print("\nGenerating {}".format(fname))

        # Start at left hand side, i.e negative angle -> positve    
        step = step - 12

        # Increment angle & calculate P
        cur_angle = theta * step
        R = calc_R(cur_angle)
        move = calc_move(cur_angle)

        M = np.matmul(K,(np.hstack((R,move))))

        # Apply P to point cloud
        img = PointCloud2Image(M,data3DC,crop_region,filter_size)
        
        '''
        ======================
        END OF CHANGES TO CODE
        '''


        # Convert image values form (0-1) to (0-255) and cahnge type from float64 to float32
        img = 255*(np.array(img, dtype=np.float32))

        # convert image from RGB to BGR for OpenCV
        img_bgr = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

        # write image to file 'fname'
        cv2.imwrite(fname,img_bgr)

        toc = time.time()
        toc = toc-tic
        print("{0:.4g} s".format(toc))

def main():
    SampleCameraPath()

if __name__ == "__main__":
    main()


# Scaling factor for inital is 1.6