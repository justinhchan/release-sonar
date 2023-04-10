import Content from "@/components/releases/modal/Content";
import useAlbum from "@/hooks/useAlbum";
import { Modal, Loader } from "@mantine/core";

interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReleaseModal({ id, isOpen, onClose }: Props) {
  const { isLoading, album } = useAlbum(isOpen ? id : "");

  return (
    <Modal opened={isOpen} onClose={onClose} centered size="lg">
      {isLoading && <Loader />}
      {!isLoading && album && <Content {...album} />}
    </Modal>
  );
}
