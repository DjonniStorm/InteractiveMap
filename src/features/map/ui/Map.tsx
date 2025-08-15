import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { Layer, Stage, Image, Circle } from 'react-konva';
import { mapStore } from '../../../shared/store/mapStore';
import { ActionIcon, FileInput, Text, Group } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.1;

const Map = observer(() => {
  const stageRef = useRef<any>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [img, setImg] = useState<HTMLImageElement | undefined>();
  const { ref: containerRef, width, height } = useElementSize();
  const { places, image, setImage } = mapStore;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const container = stage.container();
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    if (!image) {
      return;
    }
    const mapImage = new window.Image();
    mapImage.src = image;
    mapImage.onload = () => {
      setImg(mapImage);
    };
  }, [image, img, setImage]);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;

    const scaleBy = 1.05;
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const direction = e.deltaY > 0 ? -1 : 1;
    let newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    newScale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);

    setScale(newScale);
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    setPosition(newPos);
  };

  const zoomIn = () =>
    setScale((prev) => Math.min(prev + SCALE_STEP, MAX_SCALE));
  const zoomOut = () =>
    setScale((prev) => Math.max(prev - SCALE_STEP, MIN_SCALE));

  if (!image || !img) {
    return (
      <>
        <Text>нет картинки</Text>
        <FileInput
          accept="image/png,image/jpeg"
          placeholder="Добавить картинку png/jpg"
          clearable
          onChange={(e) => {
            // const url = new URL(e)
            if (!e) {
              setImage(undefined);
              return;
            }
            setImage(URL.createObjectURL(e));
          }}
        />
      </>
    );
  }

  return (
    <div ref={containerRef} style={{ flex: 1, height: '80%' }}>
      <Stage
        scaleX={scale}
        scaleY={scale}
        x={position.x}
        y={position.y}
        ref={stageRef}
        width={width}
        height={height}
        draggable
        style={{ backgroundColor: '#ECF2F9' }}
      >
        <Layer>
          <Image image={img} />
          {places?.map((place) => (
            <Circle
              key={place.id}
              x={place.x}
              y={place.y}
              radius={5}
              fill="#0f0"
            />
          ))}
        </Layer>
      </Stage>
      <Group mt="md">
        <ActionIcon
          variant="filled"
          onClick={zoomIn}
          disabled={scale >= MAX_SCALE}
        >
          +
        </ActionIcon>
        <ActionIcon
          variant="filled"
          onClick={zoomOut}
          disabled={scale <= MIN_SCALE}
        >
          -
        </ActionIcon>
      </Group>
    </div>
  );
});

export { Map };
