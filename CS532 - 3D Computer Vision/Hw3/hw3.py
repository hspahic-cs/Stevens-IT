import numpy as np
from PIL import Image

PROJECTIONS = [ 
    [776.649963, -298.408539, -32.048386,  993.1581875, 132.852554,  120.885834,  -759.210876, 1982.174000, 0.744869,  0.662592,  -0.078377, 4.629312012],
    [431.503540,  586.251892,  -137.094040, 1982.053375, 23.799522,   1.964373,    -657.832764, 1725.253500, -0.321776, 0.869462,  -0.374826, 5.538025391],
    [-153.607925, 722.067139,  -127.204468, 2182.4950,   141.564346,  74.195686,   -637.070984, 1551.185125, -0.769772, 0.354474,  -0.530847, 4.737782227],
    [-823.909119, 55.557896,   -82.577644,  2498.20825,  -31.429972,  42.725830,   -777.534546, 2083.363250, -0.484634, -0.807611, -0.335998, 4.934550781],
    [-715.434998, -351.073730, -147.460815, 1978.534875, 29.429260,   -2.156084,   -779.121704, 2028.892750, 0.030776,  -0.941587, -0.335361, 4.141203125],
    [-417.221649, -700.318726, -27.361042,  1599.565000, 111.925537,  -169.101776, -752.020142, 1982.983750, 0.542421,  -0.837170, -0.070180, 3.929336426],
    [94.934860,   -668.213623, -331.895508, 769.8633125, -549.403137, -58.174614,  -342.555359, 1286.971000, 0.196630,  -0.136065, -0.970991, 3.574729736],
    [452.159027,  -658.943909, -279.703522, 883.495000,  -262.442566, 1.231108,    -751.532349, 1884.149625, 0.776201,  0.215114,  -0.592653, 4.235517090]]


# Step 1: Create a voxel grid

def create_voxel_grid(x_range, y_range, z_range, voxel_size):
    """
    Create a voxel grid with the given dimensions and voxel size.
    The voxel grid is a 3D numpy array of shape dims.
    """ 

    # Calculate the number of voxels in each dimension
    x = np.linspace(x_range[0], x_range[1], int((x_range[1]-x_range[0])/voxel_size))
    y = np.linspace(y_range[0], y_range[1], int((y_range[1]-y_range[0])/voxel_size))
    z = np.linspace(z_range[0], z_range[1], int((z_range[1]-z_range[0])/voxel_size))
    
    # Create a 3D numpy array of zeros
    grid = np.meshgrid(x, y, z, indexing='ij')
    voxel_centers = np.vstack(list(map(np.ravel, grid)))    

    return voxel_centers

def is_inside_silhouette(voxel_centers, projection_matrices, silhouettes):
    # This function should project the voxel_center to each image plane
    # using the projection matrices and check if it lies inside all silhouettes
    # Return True if inside all silhouettes, False otherwise

    with Image.open()


    occupied_voxels = []
    for voxel in voxel_centers:
        if is_inside_silhouette(voxel, projection_matrices, silhouettes):
            occupied_voxels.append(voxel)

    occupied_ratio = len(occupied_voxels) / len(voxel_centers)
    print("Total Occupied Voxels:", len(occupied_voxels))
    print("Occupied Ratio:", occupied_ratio)


voxels = create_voxel_grid([-2.5, 2.5], [-3, 3], [0, 2.5], 0.1)
# project_voxel('cs532_HW03/cam00_00023_0000008550.png', voxels, voxel_size, np.array([776.649963, -298.408539, -32.048386,  993.1581875, 132.852554,  120.885834,  -759.210876, 1982.174000, 0.744869,  0.662592,  -0.078377, 4.629312012]).reshape(3, 4))

