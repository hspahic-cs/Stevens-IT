import numpy as np
import pickle
import time
import sys

import cv2
from scipy.signal import medfilt
from scipy.ndimage import maximum_filter as maxfilt
import open3d as o3d


def setup_renderer(points, height, width):
    pts = o3d.utility.Vector3dVector(points[:3,:].transpose())
    colors = o3d.utility.Vector3dVector(points[3:,:].transpose())
    cloud = o3d.geometry.PointCloud()
    cloud.points = pts
    cloud.colors = colors

    # Step 1a: Reduce pixel resolution
    height, width = height // 2, width // 2

    # set up the renderer
    renderer = o3d.visualization.rendering.OffscreenRenderer(width, height)
    mat = o3d.visualization.rendering.MaterialRecord()
    mat.shader = 'defaultUnlit'
    renderer.scene.add_geometry("cloud", cloud, mat)
    renderer.scene.set_background(np.asarray([0,0,0,1])) #r,g,b,a

    return renderer

def PointCloud2Image(K, P, renderer, height, width, w):
    intrins = o3d.camera.PinholeCameraIntrinsic(width, height, K[0,0], K[1,1], K[0,2], K[1,2])
    P = np.vstack((P,np.asarray([[0,0,0,1]])))
    renderer.setup_camera(intrins, P)

    # render image
    image = np.asarray(renderer.render_to_image())
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    return image

def scale_intrinsics(K, scale=1.0):
    # fill in code here !!!

    # Step 1b: Change internal camera intrinsics
    K[0,0] = K[0,0] / scale
    K[1,1] = K[1,1] / scale

    return K

def SampleCameraPath():
    # load object file to retrieve data
    file_p = open("data.obj",'rb')
    camera_objs = pickle.load(file_p)

    # extract objects from object array
    (top, left, height, width) = camera_objs[0].flatten()
    (w,_) = camera_objs[1].flatten()
    K = camera_objs[2]
    R = np.identity(3)

    # Changing scale to 0.5 to match change in pixel quality
    scale = 0.5
    zoom_iters = 40
    zoom = np.array([0,0,0.0]).reshape((3,1))

    #scale K to desired width/height
    K = scale_intrinsics(K, scale)
    f = K[0,0]
    height, width = int(height*scale), int(width*scale)

    # setup point cloud
    ForegroundPointCloudRGB = camera_objs[3]
    BackgroundPointCloudRGB = camera_objs[4]
    points = np.hstack((BackgroundPointCloudRGB,ForegroundPointCloudRGB))

    # get average foreground Z distance (should be ~4m + zoom)
    Z_avg = np.mean(ForegroundPointCloudRGB[2,:]) + zoom[2,0]

    # setup renderer for point cloud
    renderer = setup_renderer(points, height, width)

    # loops from 0.25 to 1.77 in 0.02 increments (75 images)
    img_array = []
    count = 0
    steps = np.linspace(0.25,1.77,num=zoom_iters)
    for step in steps:
        tic = time.time()

        fname = "SampleOutput{}.jpg".format(count)
        print("\nGenerating {}".format(fname))
        count += 1

        # adjust z steps
        t = np.array([0,0,step]).reshape((3,1))

        # get change from original distance Z
        dZ = step

        # apply constant zoom factor to image
        t += zoom

        # calculate and set new focal length
        fp = f*((Z_avg+dZ)/Z_avg)
        K[0,0] = fp
        K[1,1] = fp

        # create extrinsics matrix
        P = np.hstack((R,t))

        # create new image after projection
        img = PointCloud2Image(K, P, renderer, height, width, w)

        # write image to file 'fname'
        cv2.imwrite(fname,img)

        # append image to img_array
        img_array.append(img.astype(np.uint8))

        toc = time.time()
        toc = toc-tic
        print("{0:.4g} s".format(toc))


    # get image specs
    height,width,_ = img_array[0].shape
    size = (width,height)

    # create video writer object
    vid = cv2.VideoWriter("dolly_zoom.mp4", cv2.VideoWriter_fourcc(*'mp4v'),15,size)

    # write each frame to the video
    for i in range(len(img_array)):
        vid.write(img_array[i])
    vid.release()


def main():
    SampleCameraPath()

if __name__ == "__main__":
    main()
